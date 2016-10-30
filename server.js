'use strict';

var dnode = require('dnode');
var url = require('url');
var httpAgent = require('socks5-http-client/lib/Agent');
var httpsAgent = require('socks5-https-client/lib/Agent');
var request = require('request');
var agentList = require('./torAgentConfig.json');
var async = require('async');
var currentAgent = 0;

var getAgent = ()=>{
    let agent;
    if(currentAgent == agentList.length){
        currentAgent = 0;
    }
    agent = agentList[currentAgent];
    currentAgent++;
    return agent;
};

var checkAgent = ()=>{
    let task = [];
    agentList.forEach((agent)=>{

        task.push((callback)=>{
            request({
                url: 'http://ipinfo.io/',
                agentClass: httpAgent,
                agentOptions: {
                    socksHost: agent.socksHost,
                    socksPort: agent.socksPort
                }
            }, function(err, res) {
                console.log(err || res.body);
                callback(null, 'done');
            });
        });
        
        async.series(task, (err, queue)=>{
            console.log('Done');
        });
    });
};

var server = dnode({
    request: (data, callback)=>{
        let urlParsed = url.parse(data.url);
        let agentClass = urlParsed.protocol == 'http:'? httpAgent: httpsAgent;
        let strictSsl = urlParsed.protocol == 'http:'? false: true;
        
        request({
            url: data.url,
            strictSSL: strictSsl,
            method: data.method,
            agentClass: agentClass,
            agentOptions: getAgent()
        }, callback);
    }
});
checkAgent();

server.listen(5000);