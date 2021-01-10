import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Cookies from 'universal-cookie';

import rootStore from '../store';
import AlertMsg from '../components/AlertMsg';
import { userLogin } from '../graphql/queries';
import { client } from '../graphql/ApolloGQL';

const Login = () => {
	const history = useHistory();
	const classes = useStyles();
	const cookies = new Cookies();

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

	const SignIn = async (form) => {
		const reqBody = {
			email: form.email.toLowerCase(),
			password: form.password,
		};

		const res = await client.query({ query: userLogin(reqBody) });

		if (res.data.userLogin.status === 200) {
			/* Add a cookie in the browser containing access token */
			cookies.set('accessToken', res.data.userLogin.data.accessToken, {
				path: '/', // if your cookie to be accessible on all pages
				expires: new Date(Date.now() + (2 * 60 * 1000))
			});

			rootStore.userStore.setUser(res.data.userLogin.data.result);
			history.push('/home');
		} else {
			setErrorText(res.data.userLogin.message);
			setErrOpen(true);
		}
	};

	return (
		<div className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container>
					<Grid item sm={7}>
						<Box display={{ xs: 'none', sm: 'block' }}>
							<Paper className={classes.leftColumn}>
								<img
									src={require('../assets/images/blog2.jpg')}
									alt="cover"
									style={styles.image}
								/>
							</Paper>
						</Box>
					</Grid>
					<Grid item xs={12} sm={5}>
						<Paper>
							<div style={styles.rightColumn}>
								<p style={styles.loginText}>
									Log in to see the latest updates...
								</p>
								<div style={styles.formField}>
									<TextField
										label="Email"
										autoFocus={true}
										autoComplete="email"
										name="email"
										inputRef={register({
											required: {
												value: true,
												message:
													'Please fill this field',
											},
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message:
													'Please enter a valid email',
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
										type={
											showPassword ? 'text' : 'password'
										}
										name="password"
										inputRef={register({
											required: {
												value: true,
												message:
													'Please fill this field',
											},
										})}
										error={errors?.password ? true : false}
										helperText={errors?.password?.message}
										onKeyDown={(event) => onKeyDown(event)}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={
															handleClickShowPassword
														}
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
									<Button style={styles.btn} type="submit">
										SIGN IN
									</Button>
								</div>
								<div>
									New User ? <Link to="/signup"> SignUp</Link>
								</div>
								<AlertMsg
									title={errorText}
									open={openErr}
									severity={'error'}
								/>
							</div>
						</Paper>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

const styles = {
	image: {
		width: '60vw',
		height: '100vh',
	},
	rightColumn: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100vh',
		alignItems: 'center',
	},
	btnDiv: {
		marginBottom: 20,
	},
	btn: {
		width: 200,
		height: 40,
		borderRadius: 5,
		backgroundColor: '#3f51b5',
		color: '#ffffff',
	},
	formField: {
		marginBottom: 40,
	},
	loginText: {
		display: 'flex',
		justifyContent: 'center',
		paddingLeft: 35,
		fontSize: 25,
		fontWeight: '400',
		color: '#3f51b5',
		marginBottom: 40,
	},
};

const useStyles = makeStyles(() => ({
	// root: {
	// 	flexGrow: 1,
	// },
	leftColumn: {
		width: '100%',
		height: '100vh',
	},
	textField: {
		width: 250,
		height: 40,
	},
}));

export default observer(Login);
