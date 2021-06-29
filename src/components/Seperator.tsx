import { HStack, Divider, Text } from '@chakra-ui/react';
import React from 'react';
const Seperator = () => {
    return (
        <HStack width="100%" style={{ marginBottom: '1rem' }} justifyContent="center">
            <Divider flex="1" />
            <Text textAlign="center" flex="0.2" color="whiteAlpha.700">
                or
            </Text>
            <Divider flex="1" />
        </HStack>
    );
};

export default Seperator;
