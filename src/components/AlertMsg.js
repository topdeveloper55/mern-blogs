import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const AlertMsg = ({ title, open, severity }) => {
    const [dialogOpen, setOpen] = useState(open);
    const [msg, setMsg] = useState(title);

    useEffect(() => {
        setMsg(title);
        setOpen(open);
    }, [title, open]);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={dialogOpen}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={() => handleClose()} severity={severity}>
                {msg}
            </Alert>
        </Snackbar>
    );
};

export default AlertMsg;
