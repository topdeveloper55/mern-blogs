import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

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
			<div style={styles.subHeader}>
				<div
					style={{ ...styles.headerText, cursor: 'pointer' }}
					onClick={() => history.replace('/home')}
				>
					Great Posts from Great Authors
				</div>
			</div>
			<div style={{ ...styles.subHeader, justifyContent: 'flex-end' }}>
				<div style={{ ...styles.headerText, marginRight: 30 }}>
					Hi {fName}
				</div>
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
					{/* <MenuItem onClick={() => history.push('')}>
                        Profile
                    </MenuItem> */}
					<MenuItem onClick={() => logOut()}>Logout</MenuItem>
				</StyledMenu>
			</div>
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
		justifyContent: 'flex-start',
		flex: 0.5,
		paddingLeft: 20,
		paddingRight: 20,
	},
	headerText: {
		color: '#ffffff',
		fontSize: 25,
		fontWeight: 'bolder',
	},
};

export default observer(Header);
