import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../connectors';

export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3React();

    useEffect(() => {
        if (suppress) {
            return () => {};
        }
        const { ethereum } = window as any;
        if (ethereum && ethereum.on && !active && !error) {
            const handleChainChanged = (chainId: number) => {
                console.log('chainChanged', chainId);
                activate(injected);
            };

            const handleAccountsChanged = (accounts: string[]) => {
                console.log('accountsChanged', accounts);
                if (accounts.length > 0) {
                    activate(injected);
                }
            };

            ethereum.on('chainChanged', handleChainChanged);
            ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('chainChanged', handleChainChanged);
                    ethereum.removeListener('accountsChanged', handleAccountsChanged);
                }
            };
        }

        return () => {};
    }, [active, error, suppress, activate]);
}
