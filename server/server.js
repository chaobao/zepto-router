/**
 * Created by zqc on 2015/5/20.
 */

console.log('dddd');

var http = require('http');

http.get('http://newdata.3g.cn/jsonInterface/index.php/Nba/Tuku/getTukuHeader?callback=jQuery19106984910371247679_1432103039210&_=1432103039211', function (res) {
    console.log('STATUS:' + res.statusCode);
    console.log('HEADERS:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data',function(chunk){
        eval(chunk);
    });
}).on('error',function(e){
    console.log(e.message);
});

function jQuery19106984910371247679_1432103039210 (data) {
    console.log(data);
}

http.createServer(function(req, res){
    console.log(req.url);
    res.writeHeader('200',{'Content-Type':'text/plain'});
    res.end(JSON.stringify({a:'dddd'}));
}).listen(3000);