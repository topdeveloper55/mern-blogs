import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createPost } from '../graphql/Queries';
import { QueryData } from '../graphql/QueryData';
import AlertMsg from '../components/SuccessMsg';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [text, changeText] = useState('');
    const [author, setAuthor] = useState('nish');
    const [open, setOpen] = React.useState(false);

    const newPost = () => {
        const form = {
            title: title,
            text: text,
            author: author,
        };
        QueryData(createPost(form));
        setOpen((state) => !state);
        setTimeout(() => (window.location.href = '/'), 3000);
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
            <AlertMsg
                title="New Post Shared with the World"
                open={open}
                severity={'success'}
            />
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
