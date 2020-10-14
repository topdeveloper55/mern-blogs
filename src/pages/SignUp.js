import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import PasswordField from 'material-ui-password-field';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Mutation } from '../hooks/QueryFetch';
import { addUser } from '../graphql/queries';

const SignUp = () => {
    const classes = useStyles();
    const [avatarURL, setAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createAccount = async() => {
        console.log('create account');
        const form = {
            name: userName,
            email,
            password,
            avatarURL
        }
        const { respData, errors } = await Mutation(addUser(form));
        console.log('data ',respData);
        console.log('error ',errors);
        return { respData, errors }
    };
    

    return (
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
                            id="outlined-multiline-flexible"
                            label="Name"
                            value={userName}
                            onChange={(event) =>
                                setUserName(event.target.value)
                            }
                            className={classes.textField}
                        />
                    </div>

                    <div style={styles.formField}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Email"
                            multiline
                            value={email}
                            className={classes.textField}
                            onChange={(event) => setEmail(event.target.value)}
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
        paddingTop: '50px',
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
