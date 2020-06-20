### mysql-friendly

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install mysql-friendly
```
or
```bash
$ npm install https://github.com/jaimejosu3/mysql-friendly
```

## Features

  * Documented models
  * Direct connection to database schema
  * Easy implementation

## Quick Start

Once the module is installed, it is necessary to configure the environment variables so that the module accesses the database.
Please configure next enviroment variables:
 ```js
process.env.DB_HOST //database host or ip
process.env.DB_USER //database username
process.env.DB_PASSWORD //database password
process.env.DB_NAME //database name 
 ```

Now you can run the command on any root of your project to build the models based on the database schema:
```bash
$ DB_HOST="<host>" \
DB_USER="<username>" \
DB_PASSWORD="<password>" \
DB_NAME="<database_name>" \
node -e 'require("mysql-friendly").buildModels();'
```

Ready.
Now you can access all the models in your database and make queries as follows:

## Examples

```js
async () => {
  const models = require("mysql-friendly").models();
  
  //Assuming that the users table exists

  //Select * from users;
  let user = await models.users.select().get();
  
  //select first_name, last_name from users;
  let user = await models.users.select(["first_name","last_name"]).get();
  
  //select first_name from users where user_id = 1 or first_name like "%hon";
  let user = await models.users.select(["first_name"]).where("user_id","=",1).or("first_name","LIKE","%hon").get();
  
  //select * from users LIMIT 10,10;
  let user = await models.users.select().skip(10).limit(10).get();
  
  //Creating new user
  let newUser = models.users.make("Jhon","Doe");
  console.log(newUser.user_id); //null (primary key) is null because not exists on db, its only in memory
  console.log(newUser.first_name); //Jhon
  
  //For insert new user
  let resultOfInsert = await newUser.insert(); // returns an object of type user with user_id
  console.log(resultOfInsert.user_id); // 1
  
  //For updates
  //update users set first_name = "Pedro";
  let resultOfUpdates = await models.users.update().set("first_name","Pedro").execute();
  
  //update users set first_name = "Pedro" where user_id = 1;
  let resultOfUpdates = await models.users.update().set("first_name","Pedro").where("user_id","=",1).execute();
}
```
