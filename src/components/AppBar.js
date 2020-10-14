import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const styles = {
    logo: {
        width: 80,
        height: 50,
    },
    btn: {
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3,
        padding: 10,
    },
};

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.title}>
                        <img
                            style={styles.logo}
                            src={require('../assets/images/blog.jpg')}
                            alt="App-Logo"
                        />
                    </div>
                    <Button
                        onClick={() => (window.location.href = '/signup')}
                        color="inherit"
                        style={styles.btn}
                    >
                        SignUp
                    </Button>
                    <Button
                        onClick={() => (window.location.href = '/login')}
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
