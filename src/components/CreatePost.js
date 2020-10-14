import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CreatePost = () => {
    return (
        <div style={styles.container}>
            <div style={styles.textDiv}>
                <TextField
                    style={styles.textField}
                    placeholder="Title of your Post"
                    variant="outlined"
                />
            </div>
            <div style={styles.textDiv}>
                <TextField
                    style={styles.textField}
                    placeholder="Share your thoughts with the world..."
                    variant="outlined"
                    multiline
                    rows={6}
                />
            </div>
            <div>
                <Button
                    onClick={() => (window.location.href = '/login')}
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
