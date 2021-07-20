import React, { FC } from 'react';
import { IconType, FileIcon } from 'react-file-icon';
import { Image, Box } from '@chakra-ui/react';
import { IconTypes } from '../../utils';

interface Props {
    data?: File;
    fileName?: string;
    mimetype?: string;
}

const PreviewLayout: FC<Props> = ({ data, fileName, mimetype }): JSX.Element => {
    const getFileType = (mimetype: string): IconType => {
        if (mimetype) {
            if (mimetype === 'text/plain') return 'document';
            if (mimetype === 'application/zip') return 'compressed';

            const type = mimetype.split('/')[0];
            if (type === 'text') return 'code';
            if (type === 'application') return 'binary';
            if (IconTypes.includes(type)) return type as IconType;
        }
        return '3d';
    };

    const getExtension = (fileName: string): string =>
        fileName.split('.')[data?.name.split('.').length - 1];

    return (
        <>
            {getFileType(data?.type) === 'image' ? (
                <Image shadow="sm" maxH={200} borderRadius={8} src={URL.createObjectURL(data)} />
            ) : (
                <Box w={12}>
                    <FileIcon
                        color="lavender"
                        type={getFileType(data ? data.type : mimetype)}
                        extension={getExtension(data ? data.name : fileName)}
                    />
                </Box>
            )}
        </>
    );
};

export const Preview = React.memo(PreviewLayout);
