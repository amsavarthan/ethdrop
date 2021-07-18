import React, { FC } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { POLLING_INTERVAL } from '../utils';
import { extendTheme } from '@chakra-ui/react';

import Home from './Home';

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
    return library;
};

const colors = {
    brand: {
        purple: '#5a44d6',
    },
};
const theme = extendTheme({
    colors,
    components: {
        Text: {
            baseStyle: {
                fontFamily: 'Work Sans',
            },
            variants: {
                bold: {
                    fontFamily: 'Montserrat',
                },
            },
        },
    },
});

const App: FC = (): JSX.Element => {
    return (
        <ChakraProvider theme={theme}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Home />
            </Web3ReactProvider>
        </ChakraProvider>
    );
};

export default App;
