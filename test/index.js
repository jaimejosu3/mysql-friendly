const models = require("../index").models();
const main = async () => {
	let r = await models.app_users.select().where("first_name","=","Jaime").or("last_name","=","").orderBy("last_name","ASC").get()
	console.log(r)
	r.forEach(appUser=>{
		console.log(appUser.first_name);
	});
	let e = await models.hosts.select(["name","location","address","banner_url","host_id"]).where("name","LIKE","%%").get()
	e.forEach(hosts=>{
		console.log(hosts)
	})
}

main();