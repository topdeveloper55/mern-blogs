import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import rootStore from '../store';
import AlertMsg from '../components/AlertMsg';
import { QueryData } from '../graphql/QueryData';
import { userLogin } from '../graphql/queries';

const Login = () => {
	const history = useHistory();
	const classes = useStyles();
	
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => SignIn(data);

	const [errorText, setErrorText] = useState('');
	const [openErr, setErrOpen] = React.useState(false);

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const onKeyDown = (event) => {
		if (event.keyCode === 13) {
			handleSubmit(onSubmit);
		}
	};

	const SignIn = async (data) => {
		const reqBody = {
			email: data.email.toLowerCase(),
			password: data.password,
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<div style={styles.formField}>
						<TextField
							label="Email"
							autoFocus={true}
							autoComplete="email"
							name="email"
							inputRef={register({
								required: {
									value: true,
									message: 'Please fill this field',
								},
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Please enter a valid email',
								},
							})}
							error={errors?.email ? true : false}
							helperText={errors?.email?.message}
							className={classes.textField}
							onKeyDown={(event) => onKeyDown(event)}
						/>
					</div>

					<div style={styles.formField}>
						<TextField
							label="Enter Password"
							className={classes.textField}
							type={showPassword ? 'text' : 'password'}
							name="password"
							inputRef={register({
								required: {
									value: true,
									message: 'Please fill this field',
								}
							})}
							error={errors?.password ? true : false}
							helperText={errors?.password?.message}
							onKeyDown={(event) => onKeyDown(event)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={
												handleMouseDownPassword
											}
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
						<Button style={styles.btn} type='submit'>
							SIGN IN
						</Button>
					</div>
					<div>
						New User ? <Link to="/signup"> SignUp</Link>
					</div>
				</form>
				<AlertMsg title={errorText} open={openErr} severity={'error'} />
			</div>
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
