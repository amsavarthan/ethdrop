/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    Button,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    Text,
    useToast,
    Collapse,
    Progress,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { isAddress } from 'web3-utils';
import { CONTRACT_ADDRESS, formatBytes } from '../../utils';
import { Preview } from './Preview';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import EthDrop from '../../contracts/EthDrop.json';
import axios from 'axios';
import { io } from 'socket.io-client';

interface Props {
    fileData: File;
}

const socket = io(window.location.origin, { autoConnect: false });

const FileUploadAlertDialog = ({ fileData }: Props) => {
    const { library, account } = useWeb3React<Web3Provider>();

    const contract: Contract = new Contract(
        CONTRACT_ADDRESS,
        EthDrop.abi,
        library?.getSigner(account as string),
    );

    const toast = useToast({ position: 'bottom', duration: 3000 });

    const [ethAddress, setEthAddress] = useState<String>();
    const [message, setMessage] = useState<String>();
    const [valid, setValid] = useState<Boolean>(false);
    const [open, setOpen] = useState<Boolean>(false);
    const [canUpload, setCanUpload] = useState<Boolean>(false);

    const [progress, setProgress] = useState(0);

    const inputRef = useRef();

    useEffect(() => {
        if (open) {
            socket.connect();
            socket.on('progress', ({ progress }) => {
                setProgress(progress);
            });
        } else {
            socket.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
        if (fileData) {
            setOpen(true);
            setCanUpload(false);
            setMessage('');
        }
    }, [fileData]);

    const handleClose = () => setOpen(false);

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleEthAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEthAddress(event.target.value);
        setValid(isAddress(event.target.value));
    };

    const handleTransfer = async (event: FormEvent) => {
        event.preventDefault();
        if (valid && account) {
            setCanUpload(true);
            const formData = new FormData();
            formData.append('file', fileData);
            formData.append('message', message as string);
            try {
                const response = await axios.post('/upload', formData, {});
                const { data } = response.data;
                performTransaction(data);
            } catch (error) {
                setCanUpload(false);
            }
        }
    };

    const performTransaction = async (data: string) => {
        try {
            await contract.transferFile(ethAddress, data);
            socket.off('progress');
            setProgress(0);
            toast.closeAll();
            toast({
                title: 'Transaction Submitted',
                description: `Waiting for confirmation from the blockchain.`,
                status: 'info',
                duration: null,
            });
            contract.once('Transaction', () => {
                setOpen(false);
                toast.closeAll();
                toast({
                    title: 'Transferred Successfully',
                    description: `${fileData.name} sent to ${ethAddress}`,
                    status: 'success',
                });
            });
        } catch (error) {
            setCanUpload(false);
            toast.closeAll();
            toast({
                title: 'Transfer Failed',
                description: error.message,
                status: 'error',
            });
        }
    };

    return (
        <AlertDialog
            closeOnOverlayClick={false}
            leastDestructiveRef={inputRef as any}
            isOpen={open as boolean}
            onClose={handleClose}
        >
            <AlertDialogOverlay>
                <form onSubmit={handleTransfer} encType="multipart/form-data">
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {canUpload ? 'Transferring File' : 'Transfer File'}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <VStack>
                                <Preview data={fileData} />
                                <Text textAlign="center">{fileData.name}</Text>
                                <Text color="gray" lineHeight={0.5} textAlign="center">
                                    {formatBytes(fileData.size as number)}
                                </Text>
                                <Collapse style={{ width: '100%' }} in={!canUpload}>
                                    <VStack>
                                        <InputGroup style={{ marginTop: '1.5rem' }}>
                                            <Input
                                                value={ethAddress as string}
                                                ref={inputRef as any}
                                                spellCheck={false}
                                                onChange={handleEthAddressChange}
                                                variant="filled"
                                                placeholder="Receiver Address"
                                            />
                                            <InputRightElement
                                                visibility={valid ? 'visible' : 'collapse'}
                                            >
                                                <CheckIcon color="green.500" />
                                            </InputRightElement>
                                        </InputGroup>
                                        <Input
                                            value={message as string}
                                            onChange={handleMessageChange}
                                            variant="filled"
                                            placeholder="Message (optional)"
                                        />
                                    </VStack>
                                </Collapse>
                            </VStack>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            {canUpload ? (
                                <Progress
                                    value={progress}
                                    size="xs"
                                    colorScheme="purple"
                                    isIndeterminate={progress === 0}
                                    width="100%"
                                />
                            ) : (
                                <>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" colorScheme="purple" ml={3}>
                                        Transfer
                                    </Button>
                                </>
                            )}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </form>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default FileUploadAlertDialog;
