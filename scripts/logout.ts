// Name: Logout Trigger
// Author: Eduard Uffelmann
// Twitter: @schmedu_
// System: lock-screen

import "@johnlindquist/kit";

async function getSystemInfoDb() {
    // @ts-ignore
    let database = await db("system-info", {
        lastLogin: new Date().toString(),
        lastLogout: undefined,
        dates: {},
    });
    return database;
}

let database = await getSystemInfoDb();

let now = new Date();

// get current date in format YYYY-MM-DD
let currentDate = now.toISOString().slice(0, 10);
let lastLogin = new Date(database.lastLogin);

let timeSinceLastLogin = (now.getTime() - lastLogin) / 1000 / 60;
// parse date from loginTimeDate
let loginTimeDate = lastLogin.toISOString().slice(0, 10);
// check if loginTimeDate is today
if (loginTimeDate === currentDate) {
    if (database.dates[currentDate] === undefined) {
        database.dates[currentDate] = {
            totalTime: timeSinceLastLogin,
        };
    } else {
        database.dates[currentDate].totalTime += timeSinceLastLogin;
    }
} else {
    // create new date from midnight of today
    let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    // get minutes from lastLogin to midnight
    let minutesSinceLastLogin = (midnight.getTime() - lastLogin) / 1000 / 60;
    if (database.dates[loginTimeDate] === undefined) {
        database.dates[loginTimeDate] = {
            totalTime: timeSinceLastLogin,
        };
    } else {
        database.dates[loginTimeDate].totalTime += timeSinceLastLogin;
        database.dates[loginTimeDate].totalTime += minutesSinceLastLogin;
    }

    // get minutes from midnight to now
    let minutesSinceMidnight = (now.getTime() - midnight.getTime()) / 1000 / 60;
    database.dates[currentDate].totalTime = minutesSinceMidnight;
}

database.lastLogout = now.toString();
await database.write();
