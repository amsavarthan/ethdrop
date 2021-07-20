import React, { FC } from 'react';
import { useMediaQuery, Grid, Image, Center } from '@chakra-ui/react';
import HistoryItem from './HistoryItem';
import { EventData } from './HistoryData';

interface Props {
    data: EventData[] | null;
    view: 'sender' | 'receiver';
    onViewClicked: (data: string) => void;
}

const HistoryDataList: FC<Props> = ({ data, view, onViewClicked }): JSX.Element => {
    const [isNotMobile] = useMediaQuery('(min-width:720px)');

    return data === null ? (
        <Center h="80vh">
            <Image
                w="512px"
                draggable="false"
                src={`${window.location.origin}/assets/floating_cat.jpg`}
            />
        </Center>
    ) : (
        <Grid py={6} gap={4} templateColumns={isNotMobile && 'repeat(2,1fr)'}>
            {data.map((value, index) => (
                <HistoryItem key={index} event={value} view={view} onViewFile={onViewClicked} />
            ))}
        </Grid>
    );
};

export default HistoryDataList;
