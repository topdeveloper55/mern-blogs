import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import PasswordField from 'material-ui-password-field';
import * as Bcrypt from 'bcryptjs';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

import AppBar from '../components/AppBar';
import AlertMsg from '../components/AlertMsg';
import { QueryData } from '../graphql/QueryData';
import { addUser } from '../graphql/Queries';

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    const { REACT_APP_SIGNUP_URL } = process.env;
    const [avatarURL] = useState(null);
    const [name, setName] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [severity, setSeverity] = React.useState(null);
    const [alertMsg, setAlertMsg] = useState(null);
    const [open, setOpen] = React.useState(false);

    const hashPswd = (pswd) => {
        const salt = Bcrypt.genSaltSync(10);
        const hash = Bcrypt.hashSync(pswd, salt);
        return hash;
    };

    const createAccount = async () => {
        if (
            name === null ||
            userName === null ||
            email === null ||
            password === null
        ) {
            setAlertMsg('Please fill all the fields');
            setSeverity('error');
            setOpen(true);
            return;
        }

        const hashedPswd = hashPswd(password);
        const form = {
            name: name,
            userName: userName.toLowerCase(),
            emailid: email.toLowerCase(),
            pswd: hashedPswd,
            avatar: avatarURL,
        };
        fetch(REACT_APP_SIGNUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    QueryData(addUser(form));
                    setAlertMsg('Account Created');
                    setSeverity('success');
                    setOpen(true);
                    setTimeout(() => history.push('/login'), 3000);
                } else {
                    setAlertMsg(res.message);
                    setSeverity('error');
                    setOpen(true);
                }
            });
    };

    return (
        <React.Fragment>
            <AppBar />
            <div style={styles.container}>
                <div style={styles.profile}>
                    <div style={styles.leftDiv}>
                        <IconButton>
                            <Avatar
                                alt="Person Image"
                                src={avatarURL}
                                className={classes.large}
                            />
                        </IconButton>
                    </div>
                    <div style={styles.rightDiv}>
                        <div style={styles.formField}>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                className={classes.textField}
                                required
                            />
                        </div>

                        <div style={styles.formField}>
                            <TextField
                                label="UserName"
                                value={userName}
                                onChange={(event) =>
                                    setUserName(event.target.value)
                                }
                                className={classes.textField}
                                required
                            />
                        </div>

                        <div style={styles.formField}>
                            <TextField
                                label="Email"
                                multiline
                                value={email}
                                className={classes.textField}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div style={styles.formField}>
                            <PasswordField
                                hintText="At least 8 characters"
                                floatingLabelText="Enter your password"
                                errorText="Your password is too short"
                                className={classes.textField}
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </div>
                <div style={styles.submitDiv}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => createAccount()}
                    >
                        Create Account
                    </Button>
                </div>
            </div>
            <AlertMsg title={alertMsg} open={open} severity={severity} />
        </React.Fragment>
    );
};

const styles = {
    container: {
        padding: '20px',
        paddingTop: '60px',
        display: 'flex',
        flexDirection: 'column',
    },
    profile: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftDiv: {
        flex: 0.4,
        display: 'flex',
        justifyContent: 'center',
    },
    rightDiv: {
        flex: 0.6,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    avatar: {
        width: '200',
        height: '200',
    },
    formField: {
        marginBottom: '40px',
    },
    submitDiv: {
        paddingTop: 30,
        display: 'flex',
        justifyContent: 'center',
    },
};

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    textField: {
        width: 400,
        height: 40,
    },
}));

export default SignUp;
