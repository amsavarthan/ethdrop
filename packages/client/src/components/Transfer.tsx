import { SlideFade, Grid, GridItem, Image, useMediaQuery } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import FileChooser from './filechooser/FileChooser';
import FileUploadModal from './modals/FileUploadModal';

const Transfer: FC = (): JSX.Element => {
    const [isNotMobile] = useMediaQuery('(min-width:720px)');
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
        <>
            <SlideFade in={true}>
                <Grid w="100%" minH="100vh" templateColumns={isNotMobile && 'repeat(2,1fr)'}>
                    {isNotMobile && (
                        <GridItem>
                            <Image
                                draggable="false"
                                width="100%"
                                h="100%"
                                objectFit="cover"
                                objectPosition="right"
                                src={`${window.location.origin}/assets/abstract.svg`}
                            />
                        </GridItem>
                    )}
                    <FileChooser onFileChoosed={onFileChoosed} onFileDropped={onFileDropped} />
                </Grid>
            </SlideFade>
            {file && <FileUploadModal fileData={file} />}
        </>
    );
};

export default Transfer;
