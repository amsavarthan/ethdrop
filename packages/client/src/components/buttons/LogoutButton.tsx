import React, { FC } from 'react';
import { Center, IconButton } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import MdIcon from '../MdIcon';

const LogoutButton: FC = (): JSX.Element => {
    const { deactivate } = useWeb3React<Web3Provider>();

    return (
        <Center>
            <IconButton
                onClick={() => deactivate()}
                _focus={undefined}
                w="100%"
                py={12}
                variant="ghost"
                aria-label="logout"
                icon={<MdIcon color="gray.400">logout</MdIcon>}
            />
        </Center>
    );
};

export default LogoutButton;
