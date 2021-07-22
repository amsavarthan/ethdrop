import React, { FC, useEffect, useState } from 'react';
import { Grid, Tabs, useToast } from '@chakra-ui/react';
import { SlideFade } from '@chakra-ui/transition';
import { Contract } from '@ethersproject/contracts';
import { CONTRACT_ADDRESS } from '../../utils';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import EthDrop from '../../contracts/EthDrop.json';
import HistoryData, { EventData } from './HistoryData';
import HistoryHeader from './HistoryHeader';

const History: FC = (): JSX.Element => {
    const { library, account } = useWeb3React<Web3Provider>();
    const [sentHistory, setSentHistory] = useState<EventData[]>([]);
    const [receivedHistory, setReceivedHistory] = useState<EventData[]>([]);
    const toast = useToast({ position: 'bottom', isClosable: true });

    const contract: Contract = new Contract(
        CONTRACT_ADDRESS,
        EthDrop.abi,
        library?.getSigner(account as string),
    );

    useEffect(() => {
        performRefresh(false);
    }, []);

    const performRefresh = (showToast = true): void => {
        if (showToast) {
            toast.closeAll();
            toast({
                title: 'Refreshed Data',
                description: 'You are seeing the latest data now',
                duration: 1000,
            });
        }
        getSentHistory();
        getReceivedHistory();
    };

    const getReceivedHistory = async (): Promise<void> => {
        const _receivedHistory: EventData[] = [];
        const received = contract.filters.Transaction(null, account);
        const data = await contract.queryFilter(received);
        if (data.length === 0) {
            setReceivedHistory(null);
            return;
        }
        data.map((value) => value.args).forEach((value) => {
            const { sender, receiver, data, timestamp } = value;
            const { _hex } = timestamp;
            const event: EventData = {
                sender,
                receiver,
                data,
                timestamp: _hex,
            };
            _receivedHistory.unshift(event);
        });
        setReceivedHistory(_receivedHistory);
    };

    const getSentHistory = async (): Promise<void> => {
        const _sentHistory: EventData[] = [];
        const sent = contract.filters.Transaction(account);
        const data = await contract.queryFilter(sent);
        if (data.length === 0) {
            setSentHistory(null);
            return;
        }
        data.map((value) => value.args).forEach((value) => {
            const { sender, receiver, data, timestamp } = value;
            const { _hex } = timestamp;
            const event: EventData = {
                sender: sender,
                receiver: receiver,
                data: data,
                timestamp: _hex,
            };
            _sentHistory.unshift(event);
        });
        setSentHistory(_sentHistory);
    };

    return (
        <SlideFade in={true}>
            <Grid templateRows="auto 1fr" py={4} w="100%" minH="100vh">
                <Tabs colorScheme="purple" variant="solid-rounded" isFitted isLazy>
                    <HistoryHeader onRefresh={performRefresh} />
                    <HistoryData sentHistory={sentHistory} receivedHistory={receivedHistory} />
                </Tabs>
            </Grid>
        </SlideFade>
    );
};

export default History;
