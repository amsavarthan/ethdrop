import { AttachmentIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React, { useRef, Fragment } from 'react';

interface Props {
    // eslint-disable-next-line no-unused-vars
    onFileChoosed: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileChooserButton = ({ onFileChoosed }: Props) => {
    const inputFile = useRef<HTMLInputElement>(null);

    const openFileChooser = (): void => {
        inputFile.current?.click();
    };

    return (
        <Fragment>
            <Button
                textColor="white"
                variant="unstyled"
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
