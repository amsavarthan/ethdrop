require('dotenv').config();
import crypto from 'crypto';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

export const PORT = process.env.PORT || 9900;
export const DB = process.env.MONGODB_URI;

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16; // For AES, this is always 16

export const getRandomNonce = () => Math.floor(Math.random() * 10000);

export const bytes32FromIpfs = (ipfsHash: string) => {
    return `0x${bs58.decode(ipfsHash).slice(2).toString('hex')}`;
};

export const ipfsFromBytes32 = (bytes32: string) => {
    const hashHex = `1220${bytes32.slice(2)}`;
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes);
    return hashStr;
};

export const encrypt = (data: string) => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(data);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (data: string) => {
    let textParts = data.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};
