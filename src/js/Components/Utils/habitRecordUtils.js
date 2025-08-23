export const findHabitsPath = (obj, path = []) => {
    if (!obj || typeof obj !== 'object') return null;

    if (Array.isArray(obj.habits)) {
        return [...path, 'habits'];
    }
    for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
            const result = findHabitsPath(obj[key], [...path, key]);
            if (result) return result;
        }
    }
    return null;
};
export const getAtPath = (obj, path) => {
    if (!path || path.length === 0) return obj;
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};
export const setAtPath = (obj, path, value) => {
    if (!path || path.length === 0) return value;

    const copy = JSON.parse(JSON.stringify(obj || {}));
    let cur = copy;

    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!cur[key] || typeof cur[key] !== 'object') cur[key] = {};
        cur = cur[key];
    }
    cur[path[path.length - 1]] = value;
    return copy;
};