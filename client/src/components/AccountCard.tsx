import React from 'react';
import { Collapse, Box, VStack, Text } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Networks } from '../utils';
const AccountCard = () => {
    const { active, account, chainId } = useWeb3React<Web3Provider>();
    return (
        <Collapse in={active}>
            <Box p={10} borderRadius={8} bgColor="blackAlpha.700" shadow="2xl">
                <VStack justifyContent="center" h="100%">
                    <Text color="purple.400">{`${Networks[chainId as number]} Test Network`}</Text>
                    <Text color="whiteAlpha.800">{account}</Text>
                </VStack>
            </Box>
        </Collapse>
    );
};

export default AccountCard;
