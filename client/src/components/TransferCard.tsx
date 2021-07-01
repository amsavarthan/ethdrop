/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, VStack, Collapse } from '@chakra-ui/react';
import FileChooser from './filechooser/FileChooser';
import Header from './Header';
import MetamaskButton from './MetamaskButton';

interface Props {
    onFileChoosed: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFileDropped: (files: FileList | null) => void;
}

const TransferCard = ({ onFileChoosed, onFileDropped }: Props) => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);

    const authenticated = (value: boolean) => {
        setUserLoggedIn(value);
    };

    return (
        <Box p={10} borderRadius={8} bgColor="blackAlpha.700" shadow="2xl">
            <VStack justifyContent="center" h="100%">
                <Header />
                <Collapse in={isUserLoggedIn}>
                    <FileChooser onFileChoosed={onFileChoosed} onFileDropped={onFileDropped} />
                </Collapse>
                <MetamaskButton authenticated={authenticated} loggedIn={isUserLoggedIn} />
            </VStack>
        </Box>
    );
};

export default TransferCard;
