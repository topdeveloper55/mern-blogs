import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		padding: 20,
	},
};

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<div style={styles.container}>Sign Up to Get Started</div>
			</AppBar>
		</div>
	);
}
