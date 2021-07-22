import { Schema, model } from 'mongoose';
import { getRandomNonce } from '../utils';

export interface User {
    address: string;
    nonce: number;
}

const userSchema = new Schema<User>({
    address: String,
    nonce: { type: Number, default: getRandomNonce() },
});

export const UserModel = model<User>('User', userSchema);
