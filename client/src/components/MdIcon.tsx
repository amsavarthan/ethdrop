import React from 'react';
import { forwardRef, Box, BoxProps } from '@chakra-ui/react';

const MdIcon = forwardRef<BoxProps, 'span'>((props, ref) => (
    <Box ref={ref} className="material-icons-round" {...props}>
        {props.children}
    </Box>
));

export default MdIcon;
