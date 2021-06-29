import { UserModel } from '../models/User';
import { Socket } from 'socket.io';
import fs from 'fs';
import { create as ipfsHttpClient } from 'ipfs-http-client';
export const ipfs = ipfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export const authenticate = async (address: string): Promise<Number> => {
    const result = await UserModel.findOne({ address: address });
    if (result) {
        return result.nonce;
    }
    return _register(address);
};

const _register = async (address: string): Promise<Number | null> => {
    const user = new UserModel({
        address: address,
    });
    try {
        const result = await UserModel.create(user);
        return result.nonce;
    } catch (error) {
        return null;
    }
};

export const uploadToIpfs = (reqFile: Express.Multer.File, socket: Socket) => {
    if (reqFile === null) {
        return null;
    }

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
};
