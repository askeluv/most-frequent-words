<!DOCTYPE html>
<html>
    <head>
        <title>100 most frequent {{language}} words</title>
    </head>
    <body>
        <h1>100 most frequent {{language}} words</h1>
        <ol>
        %for w in words:
        <li><a href={{w['href']}}>{{w['title']}}</a></li>
        %end
        </ul>
    </body>
</html>