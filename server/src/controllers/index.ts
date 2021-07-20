import fs from 'fs';
import { Socket } from 'socket.io';
import { Request, Response } from 'express';
import { bytes32FromIpfs, decrypt, encrypt, getRandomNonce, ipfsFromBytes32 } from '../utils';
import { _isPresent, _uploadToIpfs } from './internal';
import { bufferToHex } from 'ethereumjs-util';
import { recoverPersonalSignature } from 'eth-sig-util';


export const performAuthentication = async (request: Request, response: Response) => {
    const { address } = request.query;
    const { nonce } = await _isPresent(address as string);
    response.json({ nonce: nonce });
}

export const performValidation = async (request: Request, response: Response) => {
    let { address, signature } = request.body;
    address = address as string
    signature = signature as string

    const user = await _isPresent(address);
    const message = `Signing in with nonce : ${user.nonce}`

    const msgBufferHex = bufferToHex(Buffer.from(message, 'utf8'));
    const _address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature
    });

    if (address.toLowerCase() === _address.toLowerCase()) {
        user.nonce = getRandomNonce();
        await user.save()
        return response.sendStatus(200);
    }

    return response
        .status(401)
        .send({ message: 'Signature verification failed' });
}

export const performUpload = async (request: Request, response: Response, socket: Socket) => {
    const { message } = request.body;

    try {
        const result = await _uploadToIpfs(request.file, socket)
        if (result) {
            const ipfsHash = bytes32FromIpfs(result.cid.toString());
            const filename = request.file?.originalname
            const sizeInBytes = request.file?.size
            const mimetype = request.file?.mimetype
            const data = encrypt(`${ipfsHash}::${message}::${filename}::${sizeInBytes}::${mimetype}`);
            return response.status(200).json({ data: data }).end();
        }
        return response.sendStatus(400);
    } catch (error) {
        response.status(500).json({ message: error });
    } finally {
        fs.unlink(request.file.path, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

export const performDecryption = (request: Request, response: Response): void => {
    let { data } = request.body;
    const decryptedData = decrypt(data)
    const ipfsHash = ipfsFromBytes32(decryptedData.split('::')[0])
    response.status(200).json({ result: decryptedData, ipfsHash }).end();
}
