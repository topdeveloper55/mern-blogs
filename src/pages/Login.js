import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import rootStore from '../store';
import AlertMsg from '../components/AlertMsg';
import { QueryData } from '../graphql/QueryData';
import { userLogin } from '../graphql/queries';

const Login = () => {
	const history = useHistory();
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorText, setErrorText] = useState('');
	const [openErr, setErrOpen] = React.useState(false);

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const onKeyDown = (event) => {
		if (event.keyCode === 13) {
			SignIn();
		}
	};

	const SignIn = async () => {
		if (email === '' || password === '') {
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
			sessionStorage.setItem(
				'accessToken',
				res.userLogin.data.accessToken
			);
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
						label="Email"
						autoFocus={true}
						value={email}
						className={classes.textField}
						onChange={(event) => setEmail(event.target.value)}
						onKeyDown={(event) => onKeyDown(event)}
						required
					/>
				</div>

				<div style={styles.formField}>
					<TextField
						label="Enter Password"
						className={classes.textField}
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						onKeyDown={(event) => onKeyDown(event)}
						required
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? (
											<VisibilityIcon />
										) : (
											<VisibilityOffIcon />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
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

export default observer(Login);
