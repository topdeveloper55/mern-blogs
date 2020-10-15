import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Header from '../components/Header';

const FullPost = (Props) => {
    const classes = useStyles();
    const postObj = Props.history.location.state.record;
    const [avatarURL, setAvatar] = useState('');

    return (
        <React.Fragment>
            <Header />
            <div style={styles.container}>
                <Card className={classes.root}>
                    <CardContent>
                        <div style={styles.titleDiv}>
                            <div style={styles.titleText}>{postObj.title}</div>
                            <div style={styles.authorRow}>
                                <div style={styles.authorSubRow}>
                                    <Avatar
                                        alt="Author Image"
                                        src={avatarURL}
                                        className={classes.large}
                                    />
                                    <div style={styles.authorName}>
                                        Person Name
                                    </div>
                                </div>
                                <div
                                    style={{
                                        ...styles.authorSubRow,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    {postObj.createdDate}
                                </div>
                            </div>
                            <div style={styles.postText}>{postObj.text}</div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </React.Fragment>
    );
};

const useStyles = makeStyles({
    root: {
        width: 800,
        margin: 30,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    large: {
        width: 40,
        height: 40,
    },
});

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10vh',
    },
    titleDiv: {
        display: 'flex',
        flexDirection: 'column',
    },
    titleText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bolder',
        fontSize: 30,
    },
    authorRow: {
        display: 'flex',
        flex: 1,
        marginTop: 20,
    },
    authorSubRow: {
        display: 'flex',
        flex: 0.5,
        fontSize: 20,
        color: 'silver',
    },
    authorName: {
        margin: 'auto',
        marginLeft: 20,
    },
    postText: {
        marginTop: 20,
    },
};
export default FullPost;
