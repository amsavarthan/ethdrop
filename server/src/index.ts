import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';

import { authenticate, uploadToIpfs } from './controllers';
import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { PORT, DB, bytes32FromIpfs, encrypt } from './utils';

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

console.log(`Starting server on ${PORT}`);

mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.use(express.static('../build'));

        const progress_middleware: RequestHandler = (request: Request, _, next: NextFunction) => {
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
            .get(async (request: Request, response: Response) => {
                const { address } = request.query;
                const nonce = await authenticate(address as string);
                response.json({ nonce: nonce });
            })
            .post(async (request: Request, response: Response) => {
                const { address, signature } = request.query;
                const nonce = await authenticate(address as string);
                response.json({ nonce: nonce });
            });

        app.post(
            '/upload',
            progress_middleware,
            file.single('file'),
            (request: Request, response: Response) => {
                const { message } = request.body;
                uploadToIpfs(request.file, socket)
                    .then((ipfsResult) => {
                        if (ipfsResult) {
                            const ipfsHash = bytes32FromIpfs(ipfsResult.cid.toString());
                            const data = encrypt(`${ipfsHash}::${message}`);
                            return response.status(200).json({ data: data }).end();
                        }
                        return response.sendStatus(400);
                    })
                    .catch((error) => {
                        response.status(500).json({ error: error });
                    })
                    .finally(() => {
                        fs.unlink(request.file.path, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
            },
        );

        http.listen(PORT, () => {
            console.log(`Server running...`);
        });

        io.attach(http);
    })
    .catch((reason) => console.log(`Server error : ${reason}`));
