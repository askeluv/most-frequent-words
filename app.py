from bs4 import BeautifulSoup as bs
import urllib2
from flask import Flask, render_template, url_for

application = Flask(__name__)
URL = { 'Spanish' : 'http://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish1000',
        'Italian' : 'http://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Italian1000',
        'French' : 'http://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/French_wordlist_opensubtitles_5000'}

def from_web(language,n=100):
    'Gets the 100 most frequent words from a wiktionary.org page'
    opener = urllib2.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    soup = bs(opener.open(URL[language]).read()) # read page, make BS object
    rows = soup.findAll('tr') # finds all <tr> elements
    
    # skip header, get 100 rows, and the <a> element
    words = [x.findAll('td')[1].a for x in rows[1:n+1]]
    ppm = []
    try:
	ppm = [x.findAll('td')[2] for x in rows[1:n+1]]
    except:
	print 'No second column found for ppm.'
    
    # make the relative paths absolute, and add language #
    for i,w in enumerate(words):
        w['href'] = 'http://en.wiktionary.org%s#%s' % (w['href'],language)
	w['num'] = i + 1
	if ppm:
	    w['ppm'] = ppm[i]
    
    return words

@application.route('/')
def index():
    return render_template('index.html',languages=URL.keys())

@application.route('/lang/<lang>')
def lang(lang):
    return render_template('lang.html', lang=lang.title(),words=from_web(lang))

if __name__ == '__main__':
	application.run(debug=True)
