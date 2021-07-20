import { Text, Grid, VStack, Center, Button } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FileIcon } from 'react-file-icon';
import { EventData } from './HistoryData';

interface Props {
    event: EventData;
    view: 'sender' | 'receiver';
    onViewFile: (data: string) => void;
}

const HistoryItem: FC<Props> = ({ event, view, onViewFile }): JSX.Element => {
    const { sender, receiver, timestamp, data } = event;
    const getAsHumanReadableTime = (): string => new Date(parseInt(timestamp) * 1000).toUTCString();
    return (
        <Grid
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            columnGap={10}
            gridTemplateColumns="auto 1fr"
            p={6}
        >
            <Center w={12}>
                <FileIcon color="lavender" type="3d" />
            </Center>
            <VStack wordBreak="break-word" alignItems="flex-start">
                <Text lineHeight="1" fontSize="md" fontWeight="bold">
                    {view === 'sender' ? receiver : sender}
                </Text>
                <Text fontSize="xs">{getAsHumanReadableTime()}</Text>
                <Button
                    onClick={() => onViewFile(data)}
                    _focus={undefined}
                    variant="outline"
                    size="sm"
                >
                    View File
                </Button>
            </VStack>
        </Grid>
    );
};
export default HistoryItem;
