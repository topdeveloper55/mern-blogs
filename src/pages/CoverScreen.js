import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const CoverScreen = () => {
	const history = useHistory();
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item sm={7}>
					<Box display={{ xs: 'none', sm: 'block' }}>
						<Paper className={classes.leftColumn}>
							<img
								src={require('../assets/images/blog_cover.png')}
								alt="cover"
								style={styles.image}
							/>
						</Paper>
					</Box>
				</Grid>
				<Grid item xs={12} sm={5}>
					<Paper>
						<div style={styles.rightColumn}>
							<div style={styles.btnDiv}>
								<Button
									style={styles.btn}
									onClick={() => history.push('/signup')}
								>
									SignUp
								</Button>
							</div>
							<div style={styles.btnDiv}>
								<Button
									style={styles.btn}
									onClick={() => history.push('/login')}
								>
									Login
								</Button>
							</div>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	leftColumn: {
		width: '100%',
		height: '100vh',
	},
}));

const styles = {
	rightColumn: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#3f51b5',
		height: '100vh',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100vh',
	},
	btnDiv: {
		marginBottom: 50,
	},
	btn: {
		width: '100%',
		height: '125%',
		minWidth: '200px',
		minHeight: '50',
		fontSize: 25,
		borderRadius: 5,
		backgroundColor: '#ffffff',
		color: '#3f51b5',
	},
};
export default CoverScreen;
