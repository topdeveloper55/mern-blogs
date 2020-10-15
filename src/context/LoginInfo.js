import React, { useState } from 'react';

const LoginContext = React.createContext();

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
