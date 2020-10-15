import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { createPost } from '../graphql/Queries';
import { QueryData } from '../graphql/QueryData';
import AlertMsg from '../components/SuccessMsg';
import Header from '../components/Header';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [text, changeText] = useState('');
    const [author, setAuthor] = useState('nish');
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const newPost = () => {
        const form = {
            title: title,
            text: text,
            author: author,
        };
        QueryData(createPost(form));
        setOpen((state) => !state);
        setTimeout(() => history.push('/home'), 3000);
    };

    return (
        <React.Fragment>
            <Header />
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
                    title="Your Post has been Shared."
                    open={open}
                    severity={'success'}
                />
            </div>
        </React.Fragment>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 50,
        alignItems: 'center',
        marginTop: '10vh',
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
