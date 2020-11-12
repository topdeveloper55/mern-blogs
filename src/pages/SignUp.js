import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Bcrypt from 'bcryptjs';
import Avatar from '@material-ui/core/Avatar';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import AppBar from '../components/AppBar';
import AlertMsg from '../components/AlertMsg';
import { QueryData } from '../graphql/QueryData';
import { addUser, beforeSignup } from '../graphql/queries';
import { DropBoxIcon, GoogleDriveIcon } from '../assets/icons/Icons';
import API from '../utils/AxiosApi';
import '../index.css';

/*  Check this link to customize input tag 
	https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/ 
	
	Make sure viewBox of svg icons in <SvgIcon/> matches the viewBox in .svg file 
*/

const SignUp = () => {
	const classes = useStyles();
	const history = useHistory();
	const [avatarURL] = useState('');

	const [severity, setSeverity] = React.useState('');
	const [alertMsg, setAlertMsg] = useState('');
	const [open, setOpen] = React.useState(false);

	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => createAccount(data);

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const hashPswd = (pswd) => {
		const salt = Bcrypt.genSaltSync(10);
		const hash = Bcrypt.hashSync(pswd, salt);
		return hash;
	};

	const onKeyDown = (event) => {
		if (event.keyCode === 13) {
			handleSubmit(onSubmit);
		}
	};

	const createAccount = async (data) => {
		let dp = '';
		if(data.photo.length > 0){	
			const formData = new FormData();
			formData.append('file', data.photo[0]);
			formData.append('upload_preset', `${process.env.REACT_APP_CLOUD_UPLOAD_PRESET}`);
			dp = await API.post('image/upload', formData);
		}
		else {
			console.log(' no img uploaded');
		}

		const hashedPswd = hashPswd(data.password);
		const form = {
			name: data.personName,
			userName: data.userName.toLowerCase(),
			emailid: data.email.toLowerCase(),
			pswd: hashedPswd,
			avatar: dp.data.secure_url,
		};

		/* Check if email and userName are already taken. */
		const res = await QueryData(beforeSignup(form));

		if (res.checkExisting.status === 200) {
			QueryData(addUser(form));
			setAlertMsg('Account Created');
			setSeverity('success');
			setOpen(true);
			setTimeout(() => history.push('/login'), 3000);
		} 
		else {
			setAlertMsg(res.checkExisting.message);
			setSeverity('error');
			setOpen(true);
		}
	};

	return (
		<div className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data">
				<Grid container>
					<Grid item xs={12}>
						<AppBar />
					</Grid>
					<Grid item xs={12} sm={6}>
						<div style={styles.leftDiv}>
							<div style={styles.inputDiv}>
								<IconButton>
									<Avatar
										alt="Person Image"
										src={avatarURL}
										className={classes.large}
									/>
								</IconButton>
							</div>
							<div
								style={{
									...styles.inputDiv,
									marginTop: '30px',
								}}
							>
								<div style={styles.fileIconDiv}>
									<label htmlFor="upload-photo">
										<AttachFileIcon
											style={{
												fontSize: 40,
												color: 'grey',
											}}
										/>
									</label>
									<input
										className="inputfile"
										type="file"
										name="photo"
										id="upload-photo"
										accept=".jpg,.jpeg,.png"
										ref={register}
									/>
								</div>
								<div
									style={styles.fileIconDiv}
									onClick={() => console.log('Google Drive')}
								>
									<GoogleDriveIcon
										style={{ fontSize: 40 }}
										viewBox="0 0 48 48"
									/>
								</div>
								<div
									style={styles.fileIconDiv}
									onClick={() => console.log('Dropbox')}
								>
									<DropBoxIcon
										style={{ fontSize: 40 }}
										viewBox="0 0 48 48"
									/>
								</div>
							</div>
						</div>
					</Grid>

					<Grid item item xs={12} sm={6}>
						<div style={styles.rightDiv}>
							<div style={styles.formField}>
								<TextField
									label="Name"
									autoFocus={true}
									autoComplete="name"
									name="personName"
									inputRef={register({
										required: {
											value: true,
											message: 'Please fill this field',
										},
										pattern: {
											value: /^[a-zA-Z]{1}[a-zA-Z ,.'-]+$/i,
											message:
												'Please enter a valid name',
										},
									})}
									error={errors?.personName ? true : false}
									helperText={errors?.personName?.message}
									onKeyDown={(event) => onKeyDown(event)}
									className={classes.textField}
								/>
							</div>

							<div style={styles.formField}>
								<TextField
									label="UserName"
									autoComplete="username"
									name="userName"
									inputRef={register({
										required: {
											value: true,
											message: 'Please fill this field',
										},
										pattern: {
											value: /^[a-zA-Z0-9]+$/i,
											message:
												'Only alphabets & numbers allowed',
										},
										minLength: {
											value: 3,
											message: 'Minimum 3 chars reqd',
										},
									})}
									error={errors?.userName ? true : false}
									helperText={errors?.userName?.message}
									onKeyDown={(event) => onKeyDown(event)}
									className={classes.textField}
								/>
							</div>

							<div style={styles.formField}>
								<TextField
									label="Email"
									autoComplete="email"
									name="email"
									inputRef={register({
										required: {
											value: true,
											message: 'Please fill this field',
										},
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message:
												'Please enter a valid email',
										},
									})}
									error={errors?.email ? true : false}
									helperText={errors?.email?.message}
									onKeyDown={(event) => onKeyDown(event)}
									className={classes.textField}
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
										},
										pattern: {
											value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
											message:
												'Min 8 Chars, with 1 uppercase, lowercase, num and spl char',
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
						</div>
					</Grid>
					<Grid item xs={12}>
						<div style={styles.submitDiv}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Create Account
							</Button>
							<AlertMsg
								title={alertMsg}
								open={open}
								severity={severity}
							/>
						</div>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

const styles = {
	leftDiv: {
		marginTop: 30,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	inputDiv: {
		display: 'flex',
		justifyContent: 'center',
	},
	fileIconDiv: {
		marginRight: '20px',
		padding: '5px',
		cursor: 'pointer',
	},
	rightDiv: {
		paddingTop: 30,
		paddingBottom: 30,
		marginTop: 30,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
	avatar: {
		width: '100%',
		height: '100%',
	},
	formField: {
		marginBottom: '45px',
	},
	submitDiv: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: 30,
	},
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	large: {
		width: theme.spacing(30),
		height: theme.spacing(30),
	},
	textField: {
		width: '250px',
		height: 40,
	},
}));

export default SignUp;
