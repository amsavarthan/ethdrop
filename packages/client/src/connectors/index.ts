import { InjectedConnector } from '@web3-react/injected-connector';
import { Networks } from '../utils';

export const injected = new InjectedConnector({
    supportedChainIds: [Networks.Rinkeby],
});
