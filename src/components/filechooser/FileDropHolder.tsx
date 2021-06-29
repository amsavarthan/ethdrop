import React from 'react';
import { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { Text } from '@chakra-ui/react';

interface Props {
    // eslint-disable-next-line no-unused-vars
    onFileDropped: (files: FileList | null) => void;
}

const FileDropHolder = ({ onFileDropped }: Props) => {
    const [dropping, isDropping] = useState<Boolean>(false);

    return (
        <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            <FileDrop
                onFrameDragLeave={() => isDropping(false)}
                onDragLeave={() => isDropping(false)}
                onDragOver={() => isDropping(true)}
                onDrop={(files: FileList | null) => {
                    isDropping(false);
                    onFileDropped(files);
                }}
            >
                <Text
                    color={dropping ? 'whiteAlpha.600' : 'whiteAlpha.700'}
                    borderRadius={8}
                    border={`2px dashed rgba(255, 255, 255, ${dropping ? '0.25' : '0.36'})`}
                    px={12}
                    py={8}
                >
                    Drop anything here
                </Text>
            </FileDrop>
        </div>
    );
};

export default FileDropHolder;
