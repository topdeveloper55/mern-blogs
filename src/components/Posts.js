import React from 'react';

const Posts = ({ postobj }) => {
    return (
        <div>
            <div>{postobj.title}</div>
            <div>{postobj.text}</div>
        </div>
    );
};
