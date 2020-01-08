//import outside modules
var mongo = require("./db");
var set = require("./setting.js");
//import module events
const events = require("events");



//quick -- database's find
async function finding() {
	return new Promise(async function(resolve,reject) {
		try {
			//open database
			mongo.open(function(err,db) {
				if (err) {
					console.error(new Date() + err + "\n");
					reject(err);
				};
				console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
				//read collection users
				db.collection("books",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						db.close();
					}
					console.debug(new Date() + "reading collection books succeed..." + "\n");
					//search students'info in this collection
					collection.find({'name': {$regex:'e'}}).toArray(function(err,docs) {resolve(docs);});
					// resolve(set[0].name);
					collection.find({'name': {$regex:'e'}},function(err,doc) {
							if (err) {
								console.error(new Date() + err + "\n");
								reject(err);
								db.close();								
							}
							//return search result
							console.debug(">>check param doc:",doc + "\n");//wing
							db.close();
							// resolve(doc);
					});
				});
			});	
		}// try endding
		catch(e){};
	});	
};


//start
// async function func() {
// 	var find = await finding();
// 	console.debug(find);
// };

// func();




// quick -- remove specific documents
async function delet() {
	return new Promise(async function(resolve,reject) {
		try {
			//open database
			mongo.open(function(err,db) {
				if (err) {
					console.error(new Date() + err + "\n");
					reject(err);
					db.close();
				};
				console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
				//read collection users
				db.collection("sessions",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						db.close();
					}
					console.debug(new Date() + "reading collection books succeed..." + "\n");
					collection.remove();
					db.close();
					resolve("finished!");
				});
			});	
		}// try endding
		catch(e){};
	});	
};

//start
async function func() {
	var result = await delet();
	console.debug(result);
};

func();