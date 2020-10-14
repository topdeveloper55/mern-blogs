import { useState, useEffect } from 'react';

const useQueryFetch = (querystr) => {
    const { REACT_APP_SERVER_URL } = process.env;

    const [data, setData] = useState(null);
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
                data ? setData(data) : setErrors(errors)
            );
    }, [querystr]);

    return { data, errors };
};

export default useQueryFetch;
