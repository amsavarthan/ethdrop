import React, { FC } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import Transfer from './Transfer';
import { POLLING_INTERVAL } from '../utils';

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
    return library;
};

const App: FC = () => {
    return (
        <ChakraProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Transfer />
            </Web3ReactProvider>
        </ChakraProvider>
    );
};

export default App;
