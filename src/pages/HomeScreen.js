import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import useQueryFetch from '../hooks/useQueryFetch';
import { getAllPosts } from '../graphql/queries';
import Posts from '../components/Posts';
import Header from '../components/Header';

const HomeScreen = () => {
	const { data, errors } = useQueryFetch(getAllPosts());
	const history = useHistory();
	const classes = useStyles();

	if (errors) {
		return <div> Error in Fetching Data </div>;
	}
	return (
		<div className={classes.root}>
			<Header />
			<div style={styles.container}>
				<Grid container></Grid>
			</div>
		</div>
	);
};

const styles = {
	container: {
		marginTop: '10vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundImage: `url(${require('../assets/images/pageCover.jpg')})`,
		height: '90vh',
	},
	postsDiv: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		paddingTop: 40,
		paddingBottom: 40,
		overflowY: 'auto',
		width: '100vw',
	},
	cardDiv: {
		flex: 0.33,
		cursor: 'pointer',
	},
	Avatar: {
		width: 30,
		height: 30,
	},
	fab: {
		position: 'fixed',
		bottom: 40,
		right: 40,
	},
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

export default HomeScreen;
