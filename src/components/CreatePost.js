import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createPost } from '../graphql/Queries';
import { QueryData } from '../graphql/QueryFns';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [text, changeText] = useState('');
    const [author, setAuthor] = useState({
        name: 'nish',
        email: 'nk@we.we',
        password: 'nish1234',
    });

    const newPost = () => {
        const form = {
            title: title,
            text: text,
            author: author,
        };
        QueryData(createPost(form));
    };

    return (
        <div style={styles.container}>
            <div style={styles.textDiv}>
                <TextField
                    style={styles.textField}
                    placeholder="Title of your Post"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div style={styles.textDiv}>
                <TextField
                    style={styles.textField}
                    placeholder="Share your thoughts with the world..."
                    variant="outlined"
                    multiline
                    rows={6}
                    value={text}
                    onChange={(e) => changeText(e.target.value)}
                />
            </div>
            <div>
                <Button
                    onClick={() => newPost()}
                    style={styles.btn}
                    size="large"
                >
                    Post
                </Button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        alignItems: 'center',
    },
    textDiv: {
        marginBottom: 20,
    },
    textField: {
        width: 800,
    },
    btn: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
    },
};

export default CreatePost;
