import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { getAllPosts } from '../graphql/queries';
import Posts from '../components/Posts';
import Header from '../components/Header';

const HomeScreen = () => {
	const { loading, error, data } = useQuery(getAllPosts());
	const history = useHistory();

	if (loading || !data) return <div>Fetching Data... </div>;
	if (error) {
		return <div> Error in Fetching Data </div>;
	}

	return (
		<Grid container style={styles.root}>
			<Grid item xs={12}>
				<Header />
			</Grid>
			<div style={styles.postsDiv}>
				<Grid container>
					{data ? (
						data.posts.map((record) => (
							<Grid item xs={12} sm={6} md={4} key={record.slug}>
								<div
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
				</Grid>
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
		marginTop: '13vh',
		marginLeft: '2vw',
		marginRight: '2vw',
		padding: 0,
		marginBottom: '1%',
	},
	cardDiv: {
		cursor: 'pointer',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	fab: {
		position: 'fixed',
		bottom: '4%',
		right: '4%',
	},
};

export default HomeScreen;
