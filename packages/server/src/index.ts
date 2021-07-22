import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

import { performAuthentication, performDecryption, performUpload, performValidation } from './controllers';
import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { PORT, DB } from './utils';

const io = new Server();
const app = express();
const http = require('http').Server(app);

const storage = multer.diskStorage({
    destination: './files/',
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const file = multer({ storage: storage });

let socket: Socket;
io.on('connection', (_socket: Socket) => {
    socket = _socket;
    console.log('Established socket connection');
});

(async () => {
    console.log(`Starting server on ${PORT}`);
    try {
        await mongoose
            .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

        app.use(express.static(path.resolve(__dirname, '../client/build')));
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json())

        app.get('*', (request: Request, response: Response) => {
            response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        });

        const uploadProgress: RequestHandler = (request: Request, _, next: NextFunction) => {
            let progress = 0;
            const file_size = request.headers['content-length'] as unknown as number;

            request.on('data', (chunk: any) => {
                progress += chunk.length;
                const percentage = (progress / file_size) * 100;
                socket.emit('progress', { progress: percentage });
            });

            next();
        };

        app.route('/user')
            .get(async (request: Request, response: Response) => performAuthentication(request, response))
            .post(async (request: Request, response: Response) => performValidation(request, response));

        app.post(
            '/upload',
            uploadProgress,
            file.single('file'),
            (request: Request, response: Response) => performUpload(request, response, socket),
        );

        app.post('/decrypt', (request: Request, response: Response) => performDecryption(request, response))

        http.listen(PORT, () => {
            console.log(`Server running...`);
        });

        io.attach(http);
    } catch (error) {
        console.log(`Server error : ${error}`);
    }
})()
