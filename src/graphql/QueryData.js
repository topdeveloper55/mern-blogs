const { REACT_APP_SERVER_URL } = process.env;

const QueryData = (querystr) => {
	return new Promise((resolve, reject) => {
		window
			.fetch(REACT_APP_SERVER_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query: querystr }),
			})
			.then((res) => res.json())
			.then(({ data, errors }) => {
				resolve(data);
				reject(errors);
			});
	});
};

export { QueryData };
