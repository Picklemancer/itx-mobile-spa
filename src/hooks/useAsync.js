import { useEffect, useState } from "react";

// enums.js
export const UseAsyncStatus = {
    Idle: 0,
    Pending: 1,
    Success: 2,
    Error: 3,
};

const useAsync = (
    getData,
    {
        initialState = null,
        immediate = true,
    },
) => {
    const [status, setStatus] = useState(UseAsyncStatus.Idle);
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(null);

    const run = () => {
        setStatus(UseAsyncStatus.Pending);

        getData()
            .then(data => {
                setStatus(UseAsyncStatus.Success);
                setState(data);
            })
            .catch(error => {
                setStatus(UseAsyncStatus.Error);
                setError(error);
            });
    };

    useEffect(() => {
        if (!immediate) return;
        run();
    }, []);

    return { status, state, error, run };
};

export default useAsync;