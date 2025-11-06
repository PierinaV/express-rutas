import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js'

export default class Server {
    constructor (){
        this.app = express ();
        this.port = 3000;
        this.generalRoute = '/api/';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        //localhost:000/api/ejemplo
        this.app.use(this.generalRoute, indexRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}