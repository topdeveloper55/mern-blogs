import React, { useState } from 'react';

const user = {
    avatarURL: '',
    name: 'Jon',
    userName: 'Snow',
    email: 'jonsnow@ty.io',
};

const LoginContext = React.createContext(user);

const LoginInfo = ({ children }) => {
    const [loggedUser, setUser] = useState();

    const changeUser = (user) => {
        setUser(user);
    };

    return (
        <LoginContext.Provider
            value={{ user: loggedUser, changeUser: changeUser }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export { LoginInfo, LoginContext };
