import React, { FC, useState } from 'react';
import { TabPanel, TabPanels, useDisclosure } from '@chakra-ui/react';
import HistoryDataList from './HistoryDataList';
import FileViewModal from '../modals/FileViewModal';

export interface EventData {
    sender: string;
    receiver: string;
    data: string;
    timestamp: string;
}

interface Props {
    sentHistory: EventData[] | null;
    receivedHistory: EventData[] | null;
}

const HistoryData: FC<Props> = ({ sentHistory, receivedHistory }): JSX.Element => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [data, setData] = useState<string>('');

    const openModal = (data: string): void => {
        setData(data);
        onOpen();
    };

    const handleClose = (): void => {
        onClose();
        setData(undefined);
    };

    return (
        <>
            <TabPanels id="history">
                <TabPanel ps={4} py={0}>
                    <HistoryDataList data={sentHistory} view="sender" onViewClicked={openModal} />
                </TabPanel>
                <TabPanel ps={4} py={0}>
                    <HistoryDataList
                        data={receivedHistory}
                        view="receiver"
                        onViewClicked={openModal}
                    />
                </TabPanel>
            </TabPanels>
            {data && <FileViewModal isOpen={isOpen} onClose={handleClose} encryptedData={data} />}
        </>
    );
};

export default HistoryData;
