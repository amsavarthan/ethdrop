import React, { FC, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { Box, Text } from '@chakra-ui/react';

interface Props {
    onFileDropped: (files: FileList | null) => void;
}

const FileDropHolder: FC<Props> = ({ onFileDropped }): JSX.Element => {
    const [dropping, isDropping] = useState<boolean>(false);

    return (
        <Box style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            <FileDrop
                onFrameDragLeave={() => {
                    isDropping(false);
                    console.log('onframedragleave');
                }}
                onDragLeave={() => isDropping(false)}
                onDragOver={() => isDropping(true)}
                onDrop={(files: FileList | null) => {
                    isDropping(false);
                    onFileDropped(files);
                }}
            >
                <Text
                    textColor={dropping ? 'gray.400' : 'gray.500'}
                    borderRadius="md"
                    border="2px dashed"
                    borderColor={dropping ? 'gray.200' : 'gray.300'}
                    px={12}
                    py={8}
                >
                    Drop anything here
                </Text>
            </FileDrop>
        </Box>
    );
};

export default FileDropHolder;
