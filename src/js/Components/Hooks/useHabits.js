import { fetchBinData, putBinDataForUser } from "../Utils/habitsApi";

export const fetchHabitsForUser = async (userId) => {
    const allHabits = await fetchBinData();

    let userHabits = allHabits.filter(h => h.userId === userId);

    if (userHabits.length === 0) {

        const demoHabits = allHabits
            .filter(h => h.userId === "demo")
            .map(h => ({ ...h, id: Date.now() + Math.random(), userId }));

        if (demoHabits.length > 0) {
            await putBinDataForUser(userId, demoHabits);
            userHabits = demoHabits;
        } else {
            userHabits = [];
        }
    }

    return userHabits;
};

export const saveHabitsForUser = async (userId, habits) => {
    return await putBinDataForUser(userId, habits);
};