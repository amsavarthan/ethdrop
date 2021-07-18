import React, { FC } from 'react';
import { Grid, Image } from '@chakra-ui/react';
import SidebarItem from './SidebarItem';
import LogoutButton from './LogoutButton';

const Sidebar: FC = (): JSX.Element => {
    return (
        <Grid bgColor="white" templateRows="1fr 1fr" pos="sticky" top="0" h="100%" w="80px">
            <Image
                draggable="false"
                width="100%"
                h="auto"
                src={`${window.location.origin}/assets/floating_diamond.gif`}
                alt="ethdrop"
            />
            <Grid>
                <SidebarItem label="Transfer" />
                <SidebarItem label="History" />
            </Grid>
            <LogoutButton />
        </Grid>
    );
};
export default Sidebar;
