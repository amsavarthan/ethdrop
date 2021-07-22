import { Tab, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
    label: string;
}

const SidebarItem: FC<Props> = ({ label }): JSX.Element => {
    return (
        <Tab
            w="80px"
            textColor="gray.400"
            _focus={undefined}
            _selected={{ textColor: 'brand.purple' }}
            _hover={{ backgroundColor: 'gray.100' }}
        >
            <Text variant="bold" transform="rotate(-90deg)">
                {label}
            </Text>
        </Tab>
    );
};

export default SidebarItem;
