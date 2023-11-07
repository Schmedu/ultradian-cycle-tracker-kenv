export async function getSystemInfoDb() {
    let database = await db(await kenvPath("db", "system-info.json"), {
        lastLogin: new Date().toString(),
        lastLogout: void 0,
        dates: {},
        currentTasks: [],
        wasShutDown: false,
    });
    return database;
}

export function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
}

export async function getCurrentTasks() {
    let db = await getSystemInfoDb();
    return db.data.currentTasks;
}

export async function setCurrentTasks(task: string) {
    let db = await getSystemInfoDb();
    db.data.currentTasks.push(task);
    await db.write();
}

export async function removeCurrentTasks(task: string) {
    let db = await getSystemInfoDb();
    db.data.currentTasks = db.data.currentTasks.filter((t) => t !== task);
    await db.write();
}
