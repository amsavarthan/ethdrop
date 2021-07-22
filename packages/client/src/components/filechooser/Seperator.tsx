import { HStack, Divider, Text } from '@chakra-ui/react';
import React from 'react';
const Seperator = (): JSX.Element => {
    return (
        <HStack width="100%" style={{ marginBottom: '1rem' }} justifyContent="center">
            <Divider flex="1" />
            <Text textAlign="center" flex="0.2" color="gray">
                or
            </Text>
            <Divider flex="1" />
        </HStack>
    );
};

export default Seperator;
