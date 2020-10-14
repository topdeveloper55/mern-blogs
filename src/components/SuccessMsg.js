import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const AlertMsg = ({ title, open, severity }) => {
    const [dialogOpen, setOpen] = useState(open);

    useEffect(() => setOpen(open), [open]);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={dialogOpen}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity}>
                {title}
            </Alert>
        </Snackbar>
    );
};

export default AlertMsg;
