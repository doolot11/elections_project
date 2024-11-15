import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function SneckCity({text,v,h}) {
    const [state, setState] = React.useState({
        open: true,
        vertical: `${v}`,
        horizontal: `${h}`,
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const buttons = (
        <React.Fragment>
            
        </React.Fragment>
    );

    return (
        <Box sx={{ width: 500 }}>
            {buttons}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={text}
                key={vertical + horizontal}
            />
        </Box>
    );
}
