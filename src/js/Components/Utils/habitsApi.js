import { findHabitsPath, getAtPath, setAtPath } from "./habitRecordUtils";

const API_URL = process.env.REACT_APP_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_API_KEY;

if (!API_URL || !API_KEY) {
    throw new Error("REACT_APP_API_ENDPOINT or REACT_APP_API_KEY is not defined");
}
export const fetchBinData = async () => {
    try {
        const res = await fetch(API_URL, { headers: { "X-Master-Key": API_KEY } });
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        const path = findHabitsPath(json?.record) || ['habits'];
        return getAtPath(json?.record, path) || [];
    } catch (err) {
        console.error('Error fetching data:', err);
        return [];
    }
};
export const putBinDataForUser = async (userId, userHabits) => {
    try {
        const res = await fetch(API_URL, { headers: { "X-Master-Key": API_KEY } });
        if (!res.ok) throw new Error("Failed to fetch existing data");
        const json = await res.json();
        const path = findHabitsPath(json?.record) || ['habits'];
        const allHabits = getAtPath(json?.record, path) || [];
        const updatedHabits = [
            ...allHabits.filter(h => h.userId !== userId),
            ...userHabits.map(h => ({ ...h, userId })),
        ];
        const updatedRecord = setAtPath(json?.record, path, updatedHabits);
        const putRes = await fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
            body: JSON.stringify({ record: updatedRecord }),
        });
        if (!putRes.ok) throw new Error("Failed to save data");
        return putRes.json();
    } catch (err) {
        console.error('Error saving data:', err);
        throw err;
    }
};