import React, { Fragment } from 'react';
import { Text } from '@chakra-ui/layout';

const Header = () => {
    return (
        <Fragment>
            <img
                draggable="false"
                height="150px"
                width="150px"
                src={`${window.location.origin}/assets/floating_diamond.gif`}
                alt="ethdrop"
            />
            <Text color="white" fontSize="2xl" lineHeight={1}>
                EthDrop
            </Text>
            <Text color="whiteAlpha.700" maxW="280px" textAlign="center" lineHeight={1.5}>
                Anonymously transfer data with help of blockchain
            </Text>
        </Fragment>
    );
};

export default Header;
