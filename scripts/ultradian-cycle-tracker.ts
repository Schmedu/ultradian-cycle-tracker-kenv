// Name: Ultradian Cycle Tracker
/// Schedule: */1 * * * *
// Exclude: true
// Author: Eduard Uffelmann
// Twitter: @schmedu_

import "@johnlindquist/kit";
import { getSystemInfoDb } from "../lib/system"; // NOT WORKING CORRECTLY, THE SYSTEM TRIGGERS ARE NOT WORKING IN A KENV

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

await menu(`${timeSinceLastLoginInMinutes}m`); // update the time in the menu bar

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
    notify({
        title: "Ultradian Cycle Tracker",
        message: `${timeSinceLastLoginInMinutes.toFixed(
            0
        )} mins worked! Take a break!`,
    });
}
