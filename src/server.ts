import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as koaBody from 'koa-body';
import * as koaCors from '@koa/cors';
import * as koaMount from 'koa-mount';
import * as koaStatic from 'koa-static';
import * as koaSwagger from 'koa2-swagger-ui';
import { RegisterRoutes } from './routes'
import { createConnection, Connection } from "typeorm";
import { UsersController } from './controllers/users.controller';


class Server {

    // List of controllers, not used in code, just to be sure they are imported for TSOA generator
    controllers = [
        UsersController,
    ];

    constructor() {
    }

    configureDB(): Promise<Connection> {

        return createConnection();
    }

    configureKoa(): Koa {
        const koa = new Koa();
        koa.use(async (ctx, next) => {
            console.log('Url:', ctx.url);
            await next(); // Pass the request to the next middleware function
        });
        koa.use(koaBody());
        koa.use(koaCors());
        return koa;
    }

    configureSwagger(koa: Koa) {
        koa.use(koaMount('/swagger-def', koaStatic('swagger-def')));
        koa.use(
            koaSwagger({
                routePrefix: '/swagger', // host at /swagger instead of default /docs
                swaggerOptions: {
                    url: 'http://localhost:3000/swagger-def/v1/swagger.yaml', // path to yaml or json
                },
            }),
        );
    }

    configureRouter(koa: Koa): void {
        const koaRouter = new KoaRouter();
        RegisterRoutes(koaRouter);
        koa.use(koaRouter.allowedMethods());
        koa.use(koaRouter.routes());
    }

    start(): void {
        this.configureDB();
        const koa = this.configureKoa();
        this.configureSwagger(koa);
        this.configureRouter(koa);
        koa.listen(3000);
        console.log('Server running on port 3000');
    }

}

const server = new Server();
server.start();









