import React, { FC, useEffect, useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import { useEagerConnect } from '../hooks/useEagerConnect';
import { useInactiveListener } from '../hooks/useInactiveListener';
import { getErrorTitle, getErrorMessage } from '../utils';

const MetamaskButton: FC = () => {
    const { activate, active, deactivate, connector, account, error } =
        useWeb3React<Web3Provider>();

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState();

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    // mount only once or face issues :P
    const triedEager = useEagerConnect();
    useInactiveListener(!triedEager || !!activatingConnector);

    const toast = useToast({ position: 'bottom', duration: 3000 });

    useEffect(() => {
        if (account) {
            toast.closeAll();
            toast({
                title: 'Connected',
                description: 'We got connected to your MetaMask account',
                status: 'success',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    useEffect(() => {
        if (error !== undefined) {
            toast.closeAll();
            toast({
                title: getErrorTitle(error),
                description: getErrorMessage(error),
                status: 'error',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const authenticateMetamask = (): void => {
        if (active) {
            deactivate();
            return;
        }
        activate(injected);
    };

    return (
        <Button onClick={authenticateMetamask} style={{ marginTop: '2rem' }}>
            <img
                height="24px"
                width="24px"
                style={{ marginRight: '8px' }}
                alt="metamask"
                src={`${window.location.origin}/assets/metamask.svg`}
            />
            {`${active ? 'Disconnect' : 'Connect'} Metamask`}
        </Button>
    );
};

export default MetamaskButton;
