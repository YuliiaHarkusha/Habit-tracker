import { setCurrentUser, fetchBinData, putBinDataForUser } from "../Utils/habitsApi";

export const fetchHabitsForUser = async (userId) => {
    setCurrentUser(userId);

    const allHabits = await fetchBinData();
    const userHabits = allHabits.filter(h => h.userId === userId);

    if (userHabits.length === 0) {

        const demoHabits = allHabits
            .filter(h => h.userId === "demo")
            .map(h => ({ ...h, id: Date.now() + Math.random(), userId }));
        console.log("Creating demo habits for new user:", demoHabits);
        await putBinDataForUser(demoHabits);
        return demoHabits;
    }

    return userHabits;
};

export const saveHabitsForUser = async (habits) => {
    return await putBinDataForUser(habits);
};
