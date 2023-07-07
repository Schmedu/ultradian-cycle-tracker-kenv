// Name: Ultradian Cycle Tracker
// Schedule: */1 * * * *
// Exclude: true
// Author: Eduard Uffelmann
// Twitter: @schmedu_

import "@johnlindquist/kit";
export async function getSystemInfoDb() {
    // @ts-ignore
    let database = await db("system-info", {
        lastLogin: new Date().toString(),
        lastLogout: undefined,
        dates: {},
    });
    return database;
}

const TIME_LIMIT = 90;
const INTERVAL_TIME = 5;

let database = await getSystemInfoDb();

// check if last login is more than 90 minutes ago
let lastLogin = Date.parse(database.lastLogin);

// how much time has passed since last login
let timeSinceLastLogin = new Date().getTime() - lastLogin;

// timeSinceLastLogin in Minutes
let timeSinceLastLoginInMinutes = parseInt(
    (timeSinceLastLogin / 1000 / 60).toFixed(0)
);

if (process.env.KIT_TRIGGER === "menu" || process.env.KIT_TRIGGER === "kar") {
    let currentDate = new Date().toISOString().slice(0, 10);
    let totalTime = database.dates[currentDate]?.totalTime || 0;
    totalTime += timeSinceLastLoginInMinutes;
    notify({
        title: "Working Time",
        message: `Total: ${(totalTime / 60).toFixed(1)}h`,
    });
}

if (
    timeSinceLastLoginInMinutes >= TIME_LIMIT &&
    Number(timeSinceLastLoginInMinutes.toFixed(0)) % INTERVAL_TIME == 0 &&
    Date.parse(database.lastLogout) < lastLogin
) {
    await notify({
        title: "Ultradian Cycle Tracker",
        message: `${timeSinceLastLoginInMinutes.toFixed(
            0
        )} mins worked! Take a break!`,
    });
}
