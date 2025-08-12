export const findHabitsPath = (obj) => {
    if (!obj || typeof obj !== 'object') return ['habits'];
    let depth = 0;
    let cur = obj;
    const path = [];
    while (cur && typeof cur === 'object' && depth < 10) {
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
    return ['habits'];
};

export const getAtPath = (obj, path) => {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

export const setAtPath = (obj, path, value) => {
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
