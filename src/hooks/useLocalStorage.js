import { useState, useEffect } from "react";
import useEventListener from "~/hooks/useEventListener";

const useLocalStorage = (
    key,
    {
        initialState = null,
        parse = JSON.parse,
        stringify = JSON.stringify,
    },
) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const storageValue = localStorage.getItem(key);
        if (storageValue) setState(parse(storageValue));
    }, [key]);

    useEventListener(window, "storage", (event) => {
        if (event.key !== key) return;
        setState(parse(event.newValue));
    });

    const set = (value) => {
        localStorage.setItem(key, stringify(value));
    };

    return [state, set];
};

export default useLocalStorage;