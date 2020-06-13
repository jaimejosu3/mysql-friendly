const main = async () => {
	const models = require("../index").models();
	let e = await models.class_sessions.select().get()
	e.forEach(hosts=>{
		console.log(hosts)
	})
}

buildModels = require("../index").buildModels

main();
//buildModels();