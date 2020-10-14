const QueryData = (querystr) => {
    const REACT_APP_SERVER_URL = `http://localhost:4000/graphql`;
    console.log(querystr);
    debugger;
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
            console.log('resp data ', data);
            return { data, errors };
        });
};

export { QueryData };
