/*
Question => How would you delete all session keys for a user?

//set the same user multipel session used redis cli
mset session:user:101:token1 "session1"
session:user:101:token2 "session2"
session:user:101:token3 "session3"

ans =>
Recommended Approach (Using SCAN)
Avoid KEYS in production because it can block Redis for large datasets.
*/

async function deleteUserSessions(userId) {

    const pattern = `session:user:${userId}:*`;

    let cursor = 0;

    do {

        // scan matching keys
        const reply = await client.scan(cursor, {
            MATCH: pattern,
            COUNT: 100
        });

        cursor = reply.cursor;

        const keys = reply.keys;

        // delete found keys
        if (keys.length > 0) {
            await client.del(keys);
            console.log("Deleted:", keys);
        }

    } while (cursor !== 0);

    console.log("All sessions deleted");
}
await deleteUserSessions("101");

//---------------------------------------------------------------------------
/*
Faster Alternative (Store Sessions in Redis Set)
Better scalable design:

used cli store the store the 101 user session

//=====================================
await client.sAdd(
    "user_sessions:101",
    "session:abc",
    "session:def"
);

//=====================================
Why the second approach is better:

No expensive key scanning
Faster lookups
Better for millions of sessions
Production scalable design
*/

async function deleteAllSessions(userId) {

    const setKey = `user_sessions:${userId}`;

    // get all session keys
    const sessions = await client.sMembers(setKey);

    if (sessions.length > 0) {
        await client.del(sessions);
    }

    // remove tracking set
    await client.del(setKey);

    console.log("All user sessions removed");
}
deleteAllSessions(101)