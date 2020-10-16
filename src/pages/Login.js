import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PasswordField from 'material-ui-password-field';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginInfo';
import AlertMsg from '../components/AlertMsg';

const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorText, setErrorText] = useState(null);
    const [openErr, setErrOpen] = React.useState(false);
    const { REACT_APP_LOGIN_URL } = process.env;
    const { changeUser } = useContext(LoginContext);

    const SignIn = () => {
        if (email === null || password === null) {
            setErrorText('Please fill all fields');
            setErrOpen(true);
            return;
        }

        const reqBody = {
            email: email.toLowerCase(),
            password: password,
        };

        fetch(REACT_APP_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    changeUser(res.data.result);
                    history.push('/home');
                } else {
                    setErrorText(res.message);
                    setErrOpen(true);
                }
            });
    };

    return (
        <div style={styles.container}>
            <div>
                <img
                    src={require('../assets/images/blog2.jpg')}
                    alt="cover"
                    style={styles.image}
                />
            </div>
            <div style={styles.rightDiv}>
                <p style={styles.loginText}>
                    Log in to see the latest updates...
                </p>
                <div style={styles.formField}>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Email"
                        multiline
                        value={email}
                        className={classes.textField}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div style={styles.formField}>
                    <PasswordField
                        floatingLabelText="Enter your password"
                        errorText="Your password is too short"
                        className={classes.textField}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <div style={styles.btnDiv}>
                    <Button style={styles.btn} onClick={() => SignIn()}>
                        SIGN IN
                    </Button>
                </div>
                <div>
                    New User ? <Link to="/signup"> SignUp</Link>
                </div>
            </div>
            <AlertMsg title={errorText} open={openErr} severity={'error'} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
    },
    image: {
        width: '60vw',
        height: '100vh',
    },
    rightDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        marginLeft: '8%',
    },
    btnDiv: {
        marginBottom: 40,
    },
    btn: {
        width: 200,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#3f51b5',
        color: '#ffffff',
    },
    formField: {
        marginBottom: 40,
    },
    loginText: {
        fontSize: 25,
        fontWeight: '400',
        color: '#3f51b5',
    },
};

const useStyles = makeStyles(() => ({
    textField: {
        width: 300,
        height: 40,
    },
}));

export default Login;
