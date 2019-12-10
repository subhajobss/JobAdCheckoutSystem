const http = require('http');
const app = require('./backend/app');
const debug = require('debug')('node-angular');


const port = process.env.PORT || '3000';
app.set('port', port);


const OnError = error=>{

    const bind = typeof port === 'string' ? 'pipe '+ port : 'port ' + port;

    switch(error.code){
        case 'EADDRINUSE' :
            console.error(bind + "is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }

}


const onListening = () =>{
    console.log("Listening on " + port);
}

const server = http.createServer(app);
server.on('error',OnError);
server.on('listening',onListening);
server.listen(port);