const express = require('express');
const cors = require('cors');
const expressRateLimit = require('express-rate-limit');

class Server {
    constructor(){
        this.app = express();

        this.limiter = expressRateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
	        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
            message: {
                message: "TOO_MANY_REQUESTS"
            }
        })
        
        this.middleWares();

        this.routes();
    }

    middleWares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ 
            extended: true 
        }));
    }

    routes(){
        this.app.use('/api', [
            this.limiter,
            require('./src/infraestructura/routes')
        ])

        this.app.get("/", (pRequest, pResponse) => {
            pResponse.status(200).send(
                "Mercado Libre Challenge API"
            );
        })

        this.app.get("*", (pRequest, pResponse) => {
            pResponse.status(404).json({
                message: "ROUTE_NOT_FOUND"
            })
        })
    }

    listen(){
        const port = process.env.PORT || 3001;

        this.app.listen(port, () => {
            console.log(`API -> Running http://localhost:${port}`)
        })
    }
}

module.exports = Server;