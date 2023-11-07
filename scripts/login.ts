// Name: Login Trigger
// Exclude: true
// Author: Eduard Uffelmann
// Twitter: @schmedu_
/// System: unlock-screen

import "@johnlindquist/kit";
import { getSystemInfoDb } from "../lib/system";

let database = await getSystemInfoDb();

database.lastLogin = new Date().toString();
await database.write();

await menu("0m")

