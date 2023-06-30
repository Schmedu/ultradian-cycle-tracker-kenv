// Name: Login Trigger
// Author: Eduard Uffelmann
// Twitter: @schmedu_
// System: unlock-screen

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

database.lastLogin = new Date().toString();
await database.write();

// await menu("0m");
