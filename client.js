var dnode = require('dnode');
var net = require('net');
var urlList = [
    {
        url:'http://ipinfo.io/',
        method: 'GET',
        handler:(err, success)=>{
            console.log('>>> ',err, success);
        }
    },
    {
        url:'http://ipinfo.io/',
        method: 'GET',
        handler:(err, success)=>{
            console.log('>>> ',err, success);
        }
    },
    {
        url:'http://ipinfo.io/',
        method: 'GET',
        handler:(err, success)=>{
            console.log('>>> ',err, success);
        }
    },
    {
        url:'http://ipinfo.io/',
        method: 'GET',
        handler:(err, success)=>{
            console.log('>>> ',err, success);
        }
    },
    {
        url:'https://encrypted.google.com/',
        method: 'GET',
        handler:(err, success)=>{
            console.log('>>> ',err, success);
        }
    }
];

var d = dnode();

d.on('remote', (remote)=>{
    urlList.forEach((req)=>{
        remote.request(req, req.handler);
    });
});

var c = net.connect(5000);
c.pipe(d).pipe(c);