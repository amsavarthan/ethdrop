import React, { FC, useEffect, useState } from 'react';
import { Grid, ScaleFade, SlideFade, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Login from './Login';
import { useWeb3React } from '@web3-react/core';
import Transfer from './Transfer';

const Home: FC = (): JSX.Element => {
    const { active } = useWeb3React();
    const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false);
    const toast = useToast({ position: 'top-right', duration: 3000 });

    useEffect(() => {
        if (active) return;
        setUserLoggedIn(false);
        toast.closeAll();
    }, [active]);

    return isUserLoggedIn ? (
        <ScaleFade in={true}>
            <Tabs variant="unstyled" isLazy>
                <Grid templateColumns="auto 1fr" w="100%" h="100vh">
                    <Sidebar />
                    <SlideFade in={true} delay={0.4} offsetY="-10px">
                        <TabPanels>
                            <TabPanel p={0}>
                                <Transfer />
                            </TabPanel>
                            <TabPanel></TabPanel>
                        </TabPanels>
                    </SlideFade>
                </Grid>
            </Tabs>
        </ScaleFade>
    ) : (
        <SlideFade in={true}>
            <Login onAuthenticated={setUserLoggedIn} />
        </SlideFade>
    );
};
export default Home;
