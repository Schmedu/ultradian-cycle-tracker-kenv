// Name: Shutdown Script
// Author: Eduard Uffelmann
// Twitter: @schmedu_
/// System: shutdown
// Exclude: true

import "@johnlindquist/kit";
import { getSystemInfoDb } from "../lib/system";

// write to file
let database = await getSystemInfoDb();

database.wasShutDown = true;
await database.write();
