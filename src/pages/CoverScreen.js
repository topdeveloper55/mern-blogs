import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const CoverScreen = () => {
    const history = useHistory();

    return (
        <div style={styles.container}>
            <img
                src={require('../assets/images/blog_cover.png')}
                alt="cover"
                style={styles.image}
            />

            <div style={styles.rightDiv}>
                <div style={styles.btnDiv}>
                    <Button
                        style={styles.btn}
                        onClick={() => history.push('/signup')}
                    >
                        SignUp
                    </Button>
                </div>
                <div style={styles.btnDiv}>
                    <Button
                        style={styles.btn}
                        onClick={() => history.push('/login')}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#3f51b5',
    },
    image: {
        width: '60vw',
        height: '100vh',
    },
    rightDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    btnDiv: {
        marginBottom: 50,
        marginLeft: '70%',
    },
    btn: {
        width: 200,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        color: '#3f51b5',
    },
};
export default CoverScreen;
