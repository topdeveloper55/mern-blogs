import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...otherProps }) => {
	const location = useLocation();

	return (
		<Route {...otherProps}>
			{user !== null ? (
				<Component {...otherProps} />
			) : (
				<Redirect
					to={{ pathname: '/login', state: { from: location } }}
				/>
			)}
		</Route>
	);
};

export default PrivateRoute;
