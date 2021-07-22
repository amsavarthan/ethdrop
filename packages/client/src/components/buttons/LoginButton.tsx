import React, { FC, useEffect } from 'react';
import { Button, Image, useToast } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';
import axios from 'axios';

interface Props {
    authenticated: (value: boolean) => void;
    loggedIn?: boolean;
}
const LoginButton: FC<Props> = ({ authenticated }): JSX.Element => {
    const { activate, deactivate, account, library } = useWeb3React<Web3Provider>();

    const toast = useToast({ position: 'bottom', isClosable: true });

    const authenticateMetamask = (): void => {
        activate(injected);
    };

    useEffect(() => {
        if (account) getNonceForSignIn();
    }, [account]);

    const getNonceForSignIn = async (): Promise<void> => {
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

    const signInWithNonce = async (nonce: number): Promise<void> => {
        try {
            const signature = await (library as Web3Provider)
                .getSigner(account as string)
                .signMessage(`Signing in with nonce : ${nonce}`);
            verifySignature(signature);
        } catch (error) {
            handleError(error.message);
        }
    };

    const verifySignature = async (signature: string): Promise<void> => {
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

    const handleError = (message: string): void => {
        deactivate();
        toast.closeAll();
        toast({
            title: 'Authenticaton Failed',
            description: message,
            status: 'error',
        });
    };

    return (
        <Button _focus={undefined} onClick={authenticateMetamask} style={{ marginTop: '2rem' }}>
            <Image
                draggable="false"
                height="24px"
                width="24px"
                style={{ marginRight: '8px' }}
                alt="metamask_logo"
                src={`${window.location.origin}/assets/metamask.svg`}
            />
            Login with Metamask
        </Button>
    );
};

export default LoginButton;
