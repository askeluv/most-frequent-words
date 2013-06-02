from bs4 import BeautifulSoup as bs
import urllib2
from bottle import Bottle

application = Bottle(__name__)
URL = { 'Spanish' : 'http://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish1000',
        'Italian' : 'http://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Italian1000',
        'French' : 'http://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/French_wordlist_opensubtitles_5000'}

def get_content_from_web(language):
    'Gets words from a en.wiktionary.org URL for most frequent words'
    url = URL[language]
    opener = urllib2.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    page = opener.open(url).read() # open and read page
    soup = bs(page) # creates a BeautifulSoup object
    rows = soup.findAll('tr') # finds all <tr> elements
    
    # grabs the second column: an <a> element
    # skips the header, and only gets 100 rows
    words = [x.findAll('td')[1].a for x in rows[1:101]]
    
    # make the relative paths absolute, and add language #
    for w in words:
        w['href'] = 'http://en.wiktionary.org%s#%s' % (w['href'],language)
    html_content = []
    html_content.append('<ol>')
    for w in words:
        html_content.append('\t<li>%s</li>' % w)
    html_content.append('</ol>')
    return '\n'.join(html_content)

def create_html(language):
    'Creates a HTML string of most frequent words for a given language'
    content = get_content_from_web(language)
    title = '100 most frequent %s words' % language
    html = '''
    <html>
        <head>
            <title>%s</title>
        </head>
        <body>
            <h1>%s</h1>
            %s
        </body>
    </html>''' % (title, title, content)
    return html

@application.route('/static/:path#.+#', name='static')
def static(path):
    return bottle.static_file(path, root='static')

@application.route('/')
def static():
    return '''
<html>
    	<head>
		<title>Most Frequent Words</title>
	</head>
	<body>
		<ul>
		<li><a href='/french'>French</a></li>
		<li><a href='/italian'>Italian</a></li>
		<li><a href='/spanish'>Spanish</a></li>
		</ul>
	</body>
</html>'''

@application.route('/spanish')
def spanish():
    return create_html('Spanish')

@application.route('/italian')
def italian():
    return create_html('Italian')

@application.route('/french')
def french():
    return create_html('French')

if __name__ == '__main__':
	application.run(host='localhost', port=8080, debug=True)
