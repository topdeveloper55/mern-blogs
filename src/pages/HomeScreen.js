import React from 'react';
import CreatePost from '../components/CreatePost';
import useQueryFetch from '../hooks/useQueryFetch';
import { getAllPosts } from '../graphql/Queries';
import Posts from '../components/Posts';

const HomeScreen = () => {
    const { data, errors } = useQueryFetch(getAllPosts());
    console.log(data);
    if (!data) {
        return <div> Data Loading...</div>;
    }
    if (errors) {
        return <div> Error in Fetching Data </div>;
    }
    return (
        <div style={styles.container}>
            {data.posts.map((record) => (
                <Posts key={record.slug} postobj={record} />
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        overflow: 'auto',
    },
};
export default HomeScreen;
