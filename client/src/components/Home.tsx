import React, { FC, useEffect, useState } from 'react';
import { ScaleFade, SlideFade, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import Sidebar from './sidebar/Sidebar';
import Login from './Login';
import Transfer from './Transfer';
import History from './history/History';
import useInactiveListener from '../hooks/useInactiveListener';

const Home: FC = (): JSX.Element => {
    const { active } = useWeb3React();
    const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false);

    const toast = useToast();
    useInactiveListener();

    useEffect(() => {
        if (active) return;
        setUserLoggedIn(false);
        toast.closeAll();
    }, [active]);

    return isUserLoggedIn ? (
        <ScaleFade in={true}>
            <Tabs variant="unstyled" isLazy>
                <Sidebar />
                <SlideFade in={true} delay={0.4} offsetY="-10px">
                    <TabPanels pt={0} ps="80px">
                        <TabPanel p={0}>
                            <Transfer />
                        </TabPanel>
                        <TabPanel borderLeft="1px solid" borderLeftColor="gray.200" ps={0} py={0}>
                            <History />
                        </TabPanel>
                    </TabPanels>
                </SlideFade>
            </Tabs>
        </ScaleFade>
    ) : (
        <SlideFade in={true}>
            <Login onAuthenticated={setUserLoggedIn} />
        </SlideFade>
    );
};
export default Home;
