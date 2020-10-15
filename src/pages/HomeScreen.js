import React, { useState, useEffect } from 'react';
import useQueryFetch from '../hooks/useQueryFetch';
import { getAllPosts } from '../graphql/Queries';
import Posts from '../components/Posts';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/Header';

const HomeScreen = () => {
    const { data, errors } = useQueryFetch(getAllPosts());
    const history = useHistory();

    if (!data) {
        return <div> Data Loading...</div>;
    }
    if (errors) {
        return <div> Error in Fetching Data </div>;
    }
    return (
        <React.Fragment>
            <Header />
            <div style={styles.container}>
                <div style={styles.postsDiv}>
                    {data.posts.map((record) => (
                        <div
                            style={styles.cardDiv}
                            onClick={() =>
                                history.push({
                                    pathname: `/posts/${record.slug}`,
                                    state: { record },
                                })
                            }
                        >
                            <Posts key={record.slug} postobj={record} />
                        </div>
                    ))}
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${require('../assets/images/pageCover.jpg')})`,
        height: '90vh',
    },
    postsDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 10,
        overflowY: 'auto',
        width: '80vw',
        // height: '80vh',
    },
    cardDiv: {
        flex: 0.33,
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
