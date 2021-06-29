/* eslint-disable no-unused-vars */
import React from 'react';
import { VStack } from '@chakra-ui/react';
import FileDropHolder from './FileDropHolder';
import Seperator from '../Seperator';
import FileChooserButton from './FileChooserButton';

interface Props {
    onFileDropped: (files: FileList | null) => void;
    onFileChoosed: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileChooser = ({ onFileDropped, onFileChoosed }: Props) => {
    return (
        <VStack justifyContent="center">
            <FileDropHolder onFileDropped={onFileDropped} />
            <Seperator />
            <FileChooserButton onFileChoosed={onFileChoosed} />
        </VStack>
    );
};
export default FileChooser;
