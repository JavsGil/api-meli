const Server = require('./server'); 

try{
    const server = new Server();
    server.listen();
}catch(pError){
    console.error(pError);
}