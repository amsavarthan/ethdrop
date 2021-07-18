import { AttachmentIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React, { useRef, Fragment, FC } from 'react';

interface Props {
    onFileChoosed: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileChooserButton: FC<Props> = ({ onFileChoosed }): JSX.Element => {
    const inputFile = useRef<HTMLInputElement>(null);

    const openFileChooser = (): void => {
        inputFile.current?.click();
    };

    return (
        <Fragment>
            <Button
                _focus={undefined}
                colorScheme="gray"
                variant="outline"
                rightIcon={<AttachmentIcon />}
                onClick={openFileChooser}
            >
                Choose a File
            </Button>
            <input
                id="input"
                type="file"
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onFileChoosed(event);
                    (inputFile.current as any).value = null;
                }}
            />
        </Fragment>
    );
};

export default FileChooserButton;
