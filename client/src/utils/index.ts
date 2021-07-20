import { UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';

export const POLLING_INTERVAL = 12000;
export const CONTRACT_ADDRESS = '0x7f28979a4D97F007b6470A0d1a6Ecf5F2037baf9';

export enum Networks {
    Ropsten = 3,
    Rinkeby = 4,
    Goerli = 5,
    Kovan = 42,
}

export const IconTypes = [
    '3d',
    'acrobat',
    'audio',
    'binary',
    'code',
    'compressed',
    'document',
    'drive',
    'font',
    'image',
    'presentation',
    'settings',
    'spreadsheet',
    'vector',
    'video',
];

export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getErrorTitle = (error: Error): string => {
    if (error instanceof NoEthereumProviderError) {
        return 'Metamask not found';
    } else if (error instanceof UnsupportedChainIdError) {
        return 'Unsupported network.';
    } else if (error instanceof UserRejectedRequestError) {
        return 'Access Denied.';
    } else {
        return 'Something went wrong.';
    }
};

export const getErrorMessage = (error: Error): string => {
    if (error instanceof NoEthereumProviderError) {
        return 'Install MetaMask or visit from a dApp browser on mobile.';
    } else if (error instanceof UnsupportedChainIdError) {
        return 'This dApp only works on Rinkeby Testnet';
    } else if (error instanceof UserRejectedRequestError) {
        return 'Please authorize EthDrop to access your Ethereum account.';
    } else {
        return 'An unknown error has occurred.';
    }
};
