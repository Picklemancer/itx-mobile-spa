export const unRef = (target) => {
    const targetIsRef = 'current' in target;
    return targetIsRef ? target.current : target;
};
