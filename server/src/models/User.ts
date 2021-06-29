import { Schema, model } from 'mongoose';

export interface User {
    address: string;
    nonce: number;
}

const userSchema = new Schema<User>({
    address: String,
    nonce: { type: Number, default: Math.floor(Math.random() * 1000000) },
});

export const UserModel = model<User>('User', userSchema);
