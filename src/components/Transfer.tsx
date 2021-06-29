import React, { FC, useState } from 'react';
import { Container, SlideFade } from '@chakra-ui/react';
// import AccountCard from './AccountCard';
import TransferCard from './TransferCard';
import FileUploadModal from './modals/FileUploadModal';
import './Transfer.css';

const Transfer: FC = () => {
    const [file, setFile] = useState<File>();

    const onFileChoosed = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.stopPropagation();
        event.preventDefault();
        setFile(event.target.files?.item(0) as File);
    };

    const onFileDropped = (files: FileList | null): void => {
        setFile(files?.item(0) as File);
    };

    return (
        <Container py={16} maxW="container.sm" minH="100vh">
            <SlideFade in={true} delay={0.1}>
                {/* <AccountCard /> */}
                {/* <br /> */}
                <TransferCard onFileChoosed={onFileChoosed} onFileDropped={onFileDropped} />
                {file && <FileUploadModal fileData={file} />}
            </SlideFade>
        </Container>
    );
};

export default Transfer;
