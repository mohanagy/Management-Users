/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.

module.exports = function(app) {
  const db = app.get("knexClient");
  const tableName = "users";

  db.schema.hasTable(tableName).then(exists => {
    //create users table if table is not there
    if (!exists) {
      // create schema when create users
      db.schema
        .createTable(tableName, table => {
          table.increments("id").primary();
          table.string("email").unique();
          table.string("password");
          table.string("age");
          table.string("address");
          table.string("userType");
          table.boolean("isAccept");
          table.boolean("disappled");
          table.timestamps(true, true);
        })
        .then(_ => {
          //add admin when create the server :)
          return db("users").insert({
            email: "admin@exaple.com",
            password:
              "$2a$10$nMELJ93j7hMvBjp0C2VwBu6C5JhIbD3Wg4oVrCCGu2/Hpzk7O4nRa", //mohammedmohammed
            age: "30",
            userType: "admin",
            isAccept: true,
            disappled: false
          });
        })
        // some commits for create table :)
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
