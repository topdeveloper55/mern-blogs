import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import useQueryFetch from '../hooks/useQueryFetch';
import { getAllPosts } from '../graphql/Queries';
import Posts from '../components/Posts';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const HomeScreen = () => {
    const { data, errors } = useQueryFetch(getAllPosts());
    const history = useHistory();
    const [avatarURL, setAvatar] = useState('');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledMenu = withStyles({
        paper: {
            border: '1px solid #d3d4d5',
        },
    })((props) => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            {...props}
        />
    ));

    if (!data) {
        return <div> Data Loading...</div>;
    }
    if (errors) {
        return <div> Error in Fetching Data </div>;
    }
    return (
        <div style={styles.container}>
            <div style={styles.headerDiv}>
                <div style={styles.subHeader}>
                    <div style={styles.headerText}>
                        Great Posts from Great Authors
                    </div>
                </div>
                <div
                    style={{ ...styles.subHeader, justifyContent: 'flex-end' }}
                >
                    <div style={{ ...styles.headerText, marginRight: 30 }}>
                        Hi Nishant
                    </div>
                    <Avatar
                        alt="User Image"
                        src={avatarURL}
                        className={styles.Avatar}
                        onClick={handleClick}
                    />
                    <StyledMenu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </StyledMenu>
                </div>
            </div>

            <div style={styles.postsDiv}>
                {data.posts.map((record) => (
                    <div
                        style={styles.cardDiv}
                        onClick={() =>
                            history.push({
                                pathname: `/posts/${record.slug}`,
                                state: { record },
                            })
                        }
                    >
                        <Posts key={record.slug} postobj={record} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${require('../assets/images/pageCover.jpg')})`,
        height: '100vh',
    },
    headerDiv: {
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
    },
    subHeader: {
        display: 'flex',
        justifyContent: 'flex-start',
        flex: 0.5,
        padding: 20,
    },
    headerText: {
        color: '#2b77ba',
        fontSize: 25,
        fontWeight: 'bolder',
    },
    postsDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 10,
        overflow: 'auto',
    },
    cardDiv: {
        flex: 0.33,
    },
    Avatar: {
        width: 30,
        height: 30,
    },
};
export default HomeScreen;
