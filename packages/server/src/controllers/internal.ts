import fs from 'fs';
import { UserModel } from '../models/User';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Socket } from 'socket.io';

const ipfs = ipfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export const _isPresent = async (address: string) => {
    const user = await UserModel.findOne({ address: address })
    if (user) {
        return user;
    }
    return _register(address);
};

export const _register = async (address: string) => {
    const user = new UserModel({
        address: address,
    });
    return await UserModel.create(user);
};

export const _uploadToIpfs = (reqFile: Express.Multer.File, socket: Socket) => {
    if (reqFile) {
        const file = fs.readFileSync(reqFile.path);
        socket.emit('progress', { progress: 0 });
        return ipfs.add(
            {
                path: reqFile.originalname,
                content: file,
            },
            {
                progress: (bytes: number) => {
                    const progress = (bytes / reqFile.size) * 100;
                    socket.emit('progress', { progress: progress });
                },
            },
        );
    }
    return null;
};
