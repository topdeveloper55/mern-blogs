import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const AlertMsg = ({ title, open, severity }) => {
    const [dialogOpen, setOpen] = useState(open);
    const [msg, setMsg] = useState(title);
    const [status, setStatus] = useState(severity);

    useEffect(() => {
        setMsg(title);
        setOpen(open);
        setStatus(severity);
    }, [title, open, severity]);

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
            <Alert onClose={() => handleClose()} severity={status}>
                {msg}
            </Alert>
        </Snackbar>
    );
};

export default AlertMsg;
