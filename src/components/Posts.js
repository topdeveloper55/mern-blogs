import React from 'react';

const Posts = ({ postobj }) => {
    return (
        <div style={styles.container}>
            <div>
                <h3>{postobj.title}</h3>
            </div>
            <div>{postobj.createdDate}</div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
        margin: 7,
        width: 400,
        border: '1px solid',
        borderRadius: 10,
    },
};
export default Posts;
