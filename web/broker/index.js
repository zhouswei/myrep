var mosca = require("mosca");
var cluster =  require("cluster");
var http = require("http");
var numCPUs = require('os').cpus().length;
//var server = new mosca.Server({
//   http: {
//     port: 3000,
//     bundle: true,
//     static: './'
//   }
// });

var ascoltatore = {
  //using ascoltatore
   type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
};

var settings = {
  port: 1883,
  backend: ascoltatore,
  http: {
    port: 8009,
    bundle: true,
    static: './' 
  },
  persistence: {
        factory: mosca.persistence.Redis
    }
};
var topics = [];
if (cluster.isMaster) {
    console.log("master start...");

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    var server = new mosca.Server(settings);
    server.workid = cluster.worker.id;
    server.on('ready', function(){
        console.log('mqtt server started', server.workid);
    });
    
    server.on('published', function(packet, client){
        console.log('Published: ', packet.payload);
        if (packet.topic === 'getCurrentClientLists') {
            console.log('getCurrentClientLists------')
            server.publish({
                topic: 'receivedClientLists',
                payload: JSON.stringify(topics)
              });
        }
    });

    server.on('subscribed', function(topic, client){
        console.log('subscribed: ', topic);
        if (topics != null) {
            var isContain = false;
            for (var i = 0; i < topics.length; i++) {
                if (topics[i] === topic) {
                    isContain = true;
                    break;
                }
            }
            if (isContain == false) {
                topics.push(topic);
            }
            
        }
        
        
    });

    server.on('unSubscribed', function(topic, client){
        console.log('unSubscribed: ', topic);
    });

    server.on('clientConnected', function(client){
        console.log('client connected: ', client.id,server.workid);
    });

    server.on('clientDisConnected', function(client){
        console.log('client disConnected: ' + client.id + " userNumber:" + usermap.keys.length);
    });

}

