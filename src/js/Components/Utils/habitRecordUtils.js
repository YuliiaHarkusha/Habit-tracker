export const findHabitsPath = (obj, maxDepth = 20) => {
    if (!obj || typeof obj !== 'object') return ['habits'];
    let depth = 0;
    let cur = obj;
    const path = [];
    while (cur && typeof cur === 'object' && depth < maxDepth) {
        if (Object.prototype.hasOwnProperty.call(cur, 'habits')) {
            return [...path, 'habits'];
        }
        if (Object.prototype.hasOwnProperty.call(cur, 'record')) {
            path.push('record');
            cur = cur.record;
        } else {
            break;
        }
        depth++;
    }
    if (cur?.record?.habits) {
        return [...path, 'record', 'habits'];
    }
    console.warn('Could not find habits path. Returning default.');
    return ['habits'];
};
export const getAtPath = (obj, path) => {
    if (!Array.isArray(path) || path.length === 0) return obj;
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};
export const setAtPath = (obj, path, value) => {
    if (!Array.isArray(path) || path.length === 0) return value;
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