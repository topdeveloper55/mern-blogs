import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PasswordField from 'material-ui-password-field';
import { observer } from 'mobx-react';

import rootStore from '../store';
import AlertMsg from '../components/AlertMsg';
import { QueryData } from '../graphql/QueryData';
import { userLogin } from '../graphql/queries';

const Login = observer(() => {
	const history = useHistory();
	const classes = useStyles();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [errorText, setErrorText] = useState(null);
	const [openErr, setErrOpen] = React.useState(false);

	const SignIn = async () => {
		if (email === null || password === null) {
			setErrorText('Please fill all fields');
			setErrOpen(true);
			return;
		}

		const reqBody = {
			email: email.toLowerCase(),
			password: password,
		};

		const res = await QueryData(userLogin(reqBody));

		if (res.userLogin.status === 200) {
			rootStore.userStore.setUser(res.userLogin.data.result);
			history.push('/home');
		} else {
			setErrorText(res.userLogin.message);
			setErrOpen(true);
		}
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
});

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
