import React from 'react';
import { IconType, FileIcon } from 'react-file-icon';
import { Image, Box } from '@chakra-ui/react';
interface Props {
    data: File;
}

const IconTypes = [
    '3d',
    'acrobat',
    'audio',
    'binary',
    'code',
    'compressed',
    'document',
    'drive',
    'font',
    'image',
    'presentation',
    'settings',
    'spreadsheet',
    'vector',
    'video',
];

const PreviewLayout = ({ data }: Props) => {
    const getFileType = (): IconType => {
        if (data) {
            const type = data.type.split('/')[0];

            if (data.type === 'text/plain') {
                return 'document';
            }

            if (data.type === 'application/zip') {
                return 'compressed';
            }

            if (type === 'text') {
                return 'code';
            }

            if (type === 'application') {
                return 'binary';
            }

            if (IconTypes.includes(type)) {
                return type as IconType;
            }
        }
        return '3d';
    };

    return (
        <>
            {data?.type.split('/')[0] === 'image' ? (
                <Image shadow="sm" maxH={200} borderRadius={8} src={URL.createObjectURL(data)} />
            ) : (
                <Box w={12}>
                    <FileIcon
                        color="lavender"
                        type={getFileType()}
                        extension={data?.name.split('.')[data?.name.split('.').length - 1]}
                    />
                </Box>
            )}
        </>
    );
};

export const Preview = React.memo(PreviewLayout);
