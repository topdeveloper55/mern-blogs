import React from 'react';
import useQueryFetch from '../hooks/useQueryFetch';
import { getAllPosts } from '../graphql/queries';
import Posts from '../components/Posts';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/Header';

const HomeScreen = () => {
    const { data, errors } = useQueryFetch(getAllPosts());
    const history = useHistory();

    if (errors) {
        return <div> Error in Fetching Data </div>;
    }
    return (
        <React.Fragment>
            <Header />
            <div style={styles.container}>
                <div style={styles.postsDiv}>
                    {data ? (
                        data.posts.map((record) => (
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
                        ))
                    ) : (
                        <div> Data Loading or server down...</div>
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
            </div>
        </React.Fragment>
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
export default HomeScreen;
