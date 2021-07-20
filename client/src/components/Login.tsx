import { VStack, Text, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import LoginButton from './buttons/LoginButton';
interface Props {
    onAuthenticated: (value: boolean) => void;
}
const Login: FC<Props> = ({ onAuthenticated }): JSX.Element => {
    return (
        <VStack h="100vh" justifyContent="center" pb={16}>
            <Image
                draggable="false"
                height="150px"
                width="150px"
                src={`${window.location.origin}/assets/floating_diamond.gif`}
                alt="ethdrop"
            />
            <Text variant="bold" fontSize="2xl" lineHeight={1}>
                EthDrop
            </Text>
            <Text color="gray.500" maxW="280px" textAlign="center" lineHeight={1.5}>
                Anonymously transfer data with help of blockchain
            </Text>
            <LoginButton authenticated={onAuthenticated} />
        </VStack>
    );
};
export default Login;
