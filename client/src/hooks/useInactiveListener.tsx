import { useToast } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

const useInactiveListener = (suppress = false): void => {
    const { active, error, deactivate } = useWeb3React();
    const toast = useToast({ position: 'bottom', isClosable: true });

    useEffect(() => {
        const { ethereum } = window as any;
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = (): void => {
                toast.closeAll();
                toast({
                    title: 'Chain changed',
                    description: 'You changed to a different chain',
                });
                deactivate();
            };
            const handleAccountsChanged = (): void => {
                toast.closeAll();
                toast({
                    title: 'Account changed',
                    description: 'You changed to a different account',
                });
                deactivate();
            };
            const handleNetworkChanged = (): void => {
                deactivate();
            };

            ethereum.on('chainChanged', handleChainChanged);
            ethereum.on('accountsChanged', handleAccountsChanged);
            ethereum.on('networkChanged', handleNetworkChanged);
        }
    }, [active, error, suppress, deactivate]);
};

export default useInactiveListener;
