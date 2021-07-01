/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import axios from 'axios';

interface Props {
    // eslint-disable-next-line no-unused-vars
    authenticated: (value: boolean) => void;
    loggedIn: boolean;
}
const MetamaskButton = ({ authenticated, loggedIn }: Props) => {
    const { activate, active, deactivate, account, library } = useWeb3React<Web3Provider>();

    const toast = useToast({ position: 'bottom', duration: 3000 });

    useEffect(() => {
        if (account) {
            getNonceForSignIn();
            return;
        }
        authenticated(false);
    }, [account]);

    const authenticateMetamask = () => {
        if (active) {
            deactivate();
            return;
        }
        activate(injected);
    };

    // eslint-disable-next-line no-unused-vars
    const getNonceForSignIn = async () => {
        authenticated(false);
        try {
            const response = await axios.get('/user', {
                params: {
                    address: account,
                },
            });
            const { nonce } = response.data;
            signInWithNonce(nonce);
        } catch (error) {
            handleError(error.message);
        }
    };

    const signInWithNonce = async (nonce: number) => {
        try {
            const signature = await (library as Web3Provider)
                .getSigner(account as string)
                .signMessage(`Signing in with nonce : ${nonce}`);
            verifySignature(signature);
        } catch (error) {
            handleError(error.message);
        }
    };

    const verifySignature = async (signature: string) => {
        try {
            const result = await axios.post('/user', {
                signature: signature,
                address: account as string,
            });
            if (result.status === 200) {
                authenticated(true);
                toast.closeAll();
                toast({
                    title: 'Connected',
                    description: 'We got connected to your MetaMask account',
                    status: 'success',
                });
            } else {
                handleError("The signed signature doesn't match with current account");
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    const handleError = (message: string) => {
        deactivate();
        toast.closeAll();
        toast({
            title: 'Authenticaton Failed',
            description: message,
            status: 'error',
        });
    };

    return (
        <Button onClick={authenticateMetamask} style={{ marginTop: '2rem' }}>
            <img
                draggable="false"
                height="24px"
                width="24px"
                style={{ marginRight: '8px' }}
                alt="metamask"
                src={`${window.location.origin}/assets/metamask.svg`}
            />
            {`${loggedIn ? 'Disconnect' : 'Connect'} Metamask`}
        </Button>
    );
};

export default MetamaskButton;
