
import {routes} from './0_routes/routes'
import {server} from './0_routes/WebSocketServer'

const port = 3000;
const port2 = 3001;

const server2 = routes.listen(port, async () =>{
    console.log('This server is listening at port:' + port);
} );

const webServer = server.listen(process.env.PORT || port2, async () => {
    console.log(`Server started on port 3001`);
});