import React, { FC, useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogCloseButton,
    Button,
    Center,
    Spinner,
    VStack,
    Text,
    Box,
} from '@chakra-ui/react';
import { formatBytes } from '../../utils';
import axios, { AxiosResponse } from 'axios';
import { Preview } from './Preview';

interface Props {
    encryptedData: string;
    isOpen: boolean;
    onClose: () => void;
}

interface Data {
    ipfsHash: string;
    message: string;
    fileName: string;
    bytes: number;
    mimetype: string;
}

const FileViewModal: FC<Props> = ({ isOpen, onClose, encryptedData }): JSX.Element => {
    const [data, setData] = useState<Data>(undefined);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log(isLoading);
        if (data === undefined) {
            axios
                .post('/decrypt', { data: encryptedData })
                .then((response: AxiosResponse) => {
                    const result: string = response.data.result;
                    const ipfsHash: string = response.data.ipfsHash;
                    const [message, fileName, bytes, mimetype] = result.split('::').slice(1);
                    setData({ ipfsHash, message, fileName, bytes: parseInt(bytes), mimetype });
                    setLoading(false);
                })
                .catch(() => onClose());
        }
    }, [data]);

    const downloadFile = (): void => {
        if (data.ipfsHash) {
            const url = `https://ipfs.infura.io/ipfs/${data.ipfsHash}`;
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            if (newWindow) newWindow.opener = null;
        }
    };

    return (
        encryptedData.length > 0 && (
            <AlertDialog
                leastDestructiveRef={undefined}
                closeOnOverlayClick={true}
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <form encType="multipart/form-data">
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                File Preview
                            </AlertDialogHeader>
                            <AlertDialogCloseButton _focus={undefined} />
                            <AlertDialogBody>
                                {isLoading ? (
                                    <Center>
                                        <Spinner />
                                    </Center>
                                ) : (
                                    data && (
                                        <VStack>
                                            {data.fileName && (
                                                <Preview
                                                    fileName={data.fileName}
                                                    mimetype={data.mimetype}
                                                />
                                            )}
                                            <Text textAlign="center">{data.fileName}</Text>
                                            <Text
                                                style={{ marginBottom: '16px' }}
                                                color="gray"
                                                fontSize="sm"
                                                lineHeight="0.2"
                                                textAlign="center"
                                            >
                                                {formatBytes(data.bytes)}
                                            </Text>
                                            {data.message && (
                                                <Box
                                                    borderRadius="md"
                                                    w="100%"
                                                    p={5}
                                                    border="1px solid"
                                                    borderColor="gray.300"
                                                    alignSelf="flex-start"
                                                >
                                                    <Text textColor="gray" fontSize="xs">
                                                        Message from sender :
                                                    </Text>
                                                    <Text>{data.message}</Text>
                                                </Box>
                                            )}
                                        </VStack>
                                    )
                                )}
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Center w="100%">
                                    <Button
                                        _focus={undefined}
                                        colorScheme="purple"
                                        onClick={downloadFile}
                                    >
                                        Download from IPFS
                                    </Button>
                                </Center>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </form>
                </AlertDialogOverlay>
            </AlertDialog>
        )
    );
};

export default FileViewModal;
