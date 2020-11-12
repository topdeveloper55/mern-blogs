import React from 'react';
import { useHistory } from 'react-router-dom';
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

	if (errors) {
		return <div> Error in Fetching Data </div>;
	}
	return (
		<Grid container style={styles.root}>
			<Grid item xs={12}>
				<Header />
			</Grid>
			<div style={styles.postsDiv}>
			{data ? (
				data.posts.map((record) => (
					<Grid item xs={12} sm={6}>
						<div
							key={record.slug}
							style={styles.cardDiv}
							onClick={() =>
								history.push({
									pathname: `/@${record.author.userName}/${record.slug}`,
									state: { record },
								})
							}
						>
							<Posts postobj={record} />
						</div>
					</Grid>
				))
			) : (
				<Grid item xs={12} md={6}>
					<div> Data Loading or server down...</div>
				</Grid>
			)}
			</div>
			<div style={styles.fab}>
					<Fab
						color="primary"
						aria-label="add"
						onClick={() => history.push('/newpost')}
					>
						<AddIcon />
					</Fab>
				</div>
		</Grid>
	);
};

const styles = {
	root: {
		height: '100vh',
		backgroundImage: `url(${require('../assets/images/pageCover.jpg')})`,
		backgroundSize: '100% 100%', //image size for bg
		overflowY: 'auto',
	},
	postsDiv: {
		marginLeft: '15vw',
		marginRight: '15vw',
		width: '70vw',
		padding: 0,
		marginBottom: '2%',
		backgroundColor: 'salmon'
	},
	cardDiv: {
		cursor: 'pointer',
	},
	Avatar: {
		width: 30,
		height: 30,
	},
	fab: {
		position: 'fixed',
		bottom: '8vw',
		right: '4vw',
	},
};

export default HomeScreen;
