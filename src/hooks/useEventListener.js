import { useEffect, useRef } from 'react';
import { unRef } from '~/utils/react';

const useEventListener = (target, events, handler, options) => {
    const eventList = Array.isArray(events) ? events : [events];
    const serializedEventList = JSON.stringify(eventList);
    const serializedOptions = JSON.stringify(options);

    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const element = unRef(target);

        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const listener = (event) => savedHandler.current && savedHandler.current(event);

        eventList.forEach(event => element.addEventListener(event, listener, options));

        return () => {
            eventList.forEach(event => element.removeEventListener(event, listener, options));
        };
    }, [serializedEventList, target, serializedOptions]);
};

export default useEventListener;