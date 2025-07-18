export const cacheWrapper = async (getData, key, stale) => {
    const storageValue = localStorage.getItem(key);
    const cachedData = storageValue ? JSON.parse(storageValue) : null;
    const isValidData = cachedData ? cachedData.expires > Date.now() : false;

    if (isValidData) return cachedData.data;

    const data = await getData();

    localStorage.setItem(
        key,
        JSON.stringify({
            expires: Date.now() + stale,
            data,
        }),
    );

    return data;
};