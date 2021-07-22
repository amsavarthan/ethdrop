import React, { FC } from 'react';
import { VStack } from '@chakra-ui/react';
import FileDropHolder from './FileDropHolder';
import Seperator from './Seperator';
import FileChooserButton from './FileChooserButton';

interface Props {
    onFileDropped: (files: FileList | null) => void;
    onFileChoosed: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileChooser: FC<Props> = ({ onFileDropped, onFileChoosed }): JSX.Element => {
    return (
        <VStack w="100%" px={6} justifyContent="center">
            <FileDropHolder onFileDropped={onFileDropped} />
            <Seperator />
            <FileChooserButton onFileChoosed={onFileChoosed} />
        </VStack>
    );
};
export default FileChooser;
