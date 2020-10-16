import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { createPost } from '../graphql/Queries';
import { QueryData } from '../graphql/QueryData';
import AlertMsg from '../components/AlertMsg';
import Header from '../components/Header';
import { LoginContext } from '../context/LoginInfo';

const CreatePost = () => {
    const { user } = useContext(LoginContext);
    const [author] = useState(user);
    const [title, setTitle] = useState(null);
    const [text, changeText] = useState(null);
    const [alertmsg, setAlertMsg] = useState(null);
    const [status, setStatus] = useState(null);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const newPost = () => {
        if (title === null || text === null) {
            setAlertMsg('Please fill all fields');
            setStatus('error');
            setOpen(true);
            return;
        }

        const form = {
            title: title,
            text: text,
            author: author,
        };

        QueryData(createPost(form));
        setAlertMsg('Your Post has been Shared');
        setStatus('success');
        setOpen(true);
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
                <AlertMsg title={alertmsg} open={open} severity={status} />
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
