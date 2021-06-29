/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Box, VStack, Collapse } from '@chakra-ui/react';
import FileChooser from './filechooser/FileChooser';
import Header from './Header';
import MetamaskButton from './MetamaskButton';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

interface Props {
    onFileChoosed: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFileDropped: (files: FileList | null) => void;
}

const TransferCard = ({ onFileChoosed, onFileDropped }: Props) => {
    const { active } = useWeb3React<Web3Provider>();

    return (
        <Box p={10} borderRadius={8} bgColor="blackAlpha.700" shadow="2xl">
            <VStack justifyContent="center" h="100%">
                <Header />
                <Collapse in={active}>
                    <FileChooser onFileChoosed={onFileChoosed} onFileDropped={onFileDropped} />
                </Collapse>
                <MetamaskButton />
            </VStack>
        </Box>
    );
};

export default TransferCard;
