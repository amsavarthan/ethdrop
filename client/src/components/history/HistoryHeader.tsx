import React, { FC } from 'react';
import { TabList, Tab, Text, IconButton, Grid, Flex } from '@chakra-ui/react';
import MdIcon from '../MdIcon';

interface Props {
    onRefresh: () => void;
}
const HistoryHeader: FC<Props> = ({ onRefresh }): JSX.Element => {
    return (
        <Grid
            px={6}
            templateColumns="auto 1fr auto"
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            py={5}
            zIndex={999}
            bgColor="white"
            pos="sticky"
            top="0"
        >
            <Text lineHeight="1" me={4} fontSize="4xl" variant="bold">
                History
            </Text>
            <Flex>
                <TabList gridGap={3}>
                    <Tab _focus={undefined}>Sent</Tab>
                    <Tab _focus={undefined}>Received</Tab>
                </TabList>
            </Flex>
            <IconButton
                borderRadius="md"
                aria-label="refresh"
                onClick={onRefresh}
                variant="ghost"
                _focus={undefined}
                icon={<MdIcon>refresh</MdIcon>}
            />
        </Grid>
    );
};

export default HistoryHeader;
