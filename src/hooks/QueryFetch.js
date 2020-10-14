import { useState, useEffect } from 'react';

const REACT_APP_SERVER_URL = `http://localhost:4000/graphql`;

const useQueryFetch = (querystr) => {
    const [respData, setRespData] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        window
            .fetch(REACT_APP_SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: querystr }),
            })
            .then((res) => res.json())
            .then(({ data, errors }) =>
                data ? setRespData(data) : setErrors(errors)
            );
    }, [querystr]);
    /* Passing querystr in dependency variables means, that the function will re-call itself
       when the value of the querystr changes */
    return { respData, errors };
};

export { useQueryFetch };
