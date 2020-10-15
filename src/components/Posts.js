import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

const Posts = ({ postobj }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {postobj.title}
                </Typography>
            </CardContent>
            <CardActions>
                <div style={styles.cardFooter}>
                    <div style={styles.leftFooter}>{postobj.author.name}</div>
                    <div style={styles.rightFooter}>{postobj.createdDate}</div>
                </div>
            </CardActions>
        </Card>
    );
};

const styles = {
    cardFooter: {
        display: 'flex',
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        flex: 1,
    },
    leftFooter: {
        display: 'flex',
        flex: 0.5,
        alignItems: 'flex-start',
    },
    rightFooter: {
        display: 'flex',
        flex: 0.5,
        justifyContent: 'flex-end',
    },
};

const useStyles = makeStyles({
    root: {
        width: 500,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 130,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
        fontWeight: 600,
        color: '#28302a',
    },
    pos: {
        marginBottom: 12,
    },
});

export default Posts;
