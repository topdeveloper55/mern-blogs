import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const Header = ({ bgColor, textColor }) => {
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

    return (
        <div style={styles.headerDiv}>
            <div style={styles.subHeader}>
                <div style={styles.headerText}>
                    Great Posts from Great Authors
                </div>
            </div>
            <div style={{ ...styles.subHeader, justifyContent: 'flex-end' }}>
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
    );
};

const styles = {
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
        color: '#3f51b5',
        fontSize: 25,
        fontWeight: 'bolder',
    },
};
export default Header;
