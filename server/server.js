/**
 * Created by zqc on 2015/5/20.
 */

var http = require('http'),
    fs = require('fs'),
    path = require('path');

var config = {
    version: '0.0.1',
    port: 3000,
    static_script: '/static/script',
    unique_html: '/example/plugin-test.html'
};

var routes = {
    '/static/script': '/static/script',
    '/man/info': '/man/info',
    '/man/setting': '/man/setting',
    '/homework/unhand': '/homework/unhand',
    '/homework/feedback': '/homework/feedback'
};

function checkUrl (url) {
    return routes[url] ? true : false;
}

function readStaticFile (fpath, res) {
    fs.readFile('.' + fpath, function(err, buf){
        if (err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("file " + fpath + " not readable " + err);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Content-Length': buf.length
            });
            res.write(buf);
            res.end();
        }
    });
}

http.createServer(function(req, res){
    if(req.url.indexOf(config.static_script) !== -1){
        readStaticFile(req.url, res);
    }
    else if(checkUrl(req.url)) {
        fs.readFile('.' + config.unique_html, function (err, buf) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end("file " + config.unique_html + " not readable " + err);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': buf.length
                });
                res.write(buf);
                res.end();
            }
        });
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("file " + req.url + " not found ");
    }
}).listen(config.port);