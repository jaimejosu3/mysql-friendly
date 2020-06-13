const mysql = require("../index");
const main = async () => {
	let r = await mysql.app_users.select().where("first_name","=","Jaime").or("last_name","=","").orderBy("last_name","ASC").get()
	console.log(r)
	r.forEach(appUser=>{
		console.log(appUser.first_name);
	});
}

main();