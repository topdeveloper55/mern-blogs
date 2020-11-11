import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import rootStore from '../store';

const Header = () => {
	const history = useHistory();
	const user = rootStore.userStore.user;
	const [avatarURL] = useState(user.avatarURL);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const fName = user.name.split(' ')[0];

	const logOut = () => {
		rootStore.userStore.setUser(null);
		history.replace('/');
	};

	const StyledMenu = withStyles({
		paper: {
			border: '1px solid #d3d4d5',
		},
	})((props) => (
		<Menu
			elevation={0}
			getContentAnchorEl={null}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			{...props}
		/>
	));

	return (
		<div style={styles.headerDiv}>
			<Grid container>
				<Grid item sm={8}>
					<Box display={{ xs: 'none', sm: 'block' }}>
						<div style={styles.subHeader}>
							<div
								style={{
									...styles.headerText,
									cursor: 'pointer',
								}}
								onClick={() => history.replace('/home')}
							>
								Great Posts from Great Authors
							</div>
						</div>
					</Box>
				</Grid>

				<Grid item xs={12} sm={4}>
					<div style={styles.subHeader}>
						<div style={styles.headerText}>Hi {fName}</div>
						<div style={{ flex: 0.1 }}>
							<Avatar
								alt="User DP"
								src={avatarURL}
								className={styles.Avatar}
								onClick={handleClick}
							/>
							<StyledMenu
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={() => logOut()}>
									Logout
								</MenuItem>
							</StyledMenu>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

const styles = {
	headerDiv: {
		display: 'flex',
		flexDirection: 'row',
		width: '100vw',
		height: '10vh',
		backgroundColor: '#3f51b5',
		alignItems: 'center',
		position: 'fixed',
		top: 0,
	},
	subHeader: {
		display: 'flex',
		paddingLeft: 20,
		paddingRight: 20,
	},
	headerText: {
		flex: 0.9,
		color: '#ffffff',
		fontSize: 25,
		fontWeight: 'bolder',
	},
};

export default observer(Header);
