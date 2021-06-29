import { InjectedConnector } from '@web3-react/injected-connector';
import { Networks } from '../utils';

export const injected = new InjectedConnector({
    supportedChainIds: [Networks.Ropsten, Networks.Rinkeby, Networks.Kovan, Networks.Goerli],
});
