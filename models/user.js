//import outside modules
var mongo = require("./db");
var set = require("./setting.js");
//import module events
const events = require("events");

//build a main class
function User(studentid,password,name,mobile,admin_name,admin_password) {
	this.event = new events.EventEmitter();
	this.event.on("close",function() {
		console.debug(new Date() + "something touch close,database closing now..." + "\n");
		mongo.close();
	});

	//define param from client's form
		//student
		this.studentid = studentid;
		this.password = password;
		this.name = name;
		this.mobile = mobile;
		this.operation = "empty";

		this.user = null;
		//administartor
		this.admin_name = admin_name;
		this.admin_password = admin_password;
};

//create prototype store students' info
User.prototype.save = function() {
	let here = this;
 	// user info that will be sent
	here.user = {
		studentid: here.studentid,
		password: here.password,
		name: here.name,
		mobile: here.mobile,
		operation: here.operation
	};
	console.debug(">>check param user:",JSON.stringify(here.user) + "\n");//wing

	return new Promise(async function(resolve,reject) {
		//open database
		mongo.open(function(err,db) {
			if (err) {
				console.error(new Date() + err + "\n");
				reject(err);
				here.event.emit("close");
			};
			console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
			//read collection users
			db.collection("users",function(err,collection) {
				if (err) {
					console.error(new Date() + err + "\n");
					reject(err);
					here.event.emit("close");
				}
				console.debug(new Date() + "reading collection users succeed..." + "\n");
				//store students'info to this collection
				collection.insert(here.user,{
					safe: true
				},function(err,doc) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						here.event.emit("close");			
					};
					console.debug(new Date() + "storing students'info succeed..." + "\n");
					//return student's info
					resolve(doc);
					here.event.emit("close");				
				});
			});
		});
	});
};


//create prototype read students' info
User.prototype.get = async function() {
	let get = this;
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
				db.collection("users",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						get.event.emit("close");
					}
					console.debug(new Date() + "reading collection users succeed..." + "\n");
					//search students'info in this collection
					collection.findOne({'studentid': get.studentid},function(err,doc) {
							if (err) {
								console.error(new Date() + err + "\n");
								reject(err);
								get.event.emit("close");								
							}
							//return search result
								console.debug(">>check param doc:",doc + "\n");//wing
							get.event.emit("close");
							resolve(doc);
					});
				});
			});	
		}// try endding
		catch(e){};
	});	
};


//create prototype update students' info
User.prototype.upgrade = async function(name,mobile,password,speid,operation) {
	let upgrade = this;

	// judge admin
	if (!speid) {
		var speid = upgrade.studentid;
	}
	else {
		var speid = speid;
	};
 	// user info that will be update
 	upgrade.user = {
 		"studentid":upgrade.studentid,
	 	"password":password,
	 	"name":name,
	 	"mobile":mobile,
	 	"operation": upgrade.operation,
 	};

	console.debug(">>check param user after judging:",JSON.stringify(upgrade.user) + "\n");//wing

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
				db.collection("users",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						upgrade.event.emit("close");
					}
					console.debug(new Date() + "reading collection users succeed..." + "\n");
					//delete old data
					collection.remove({'studentid': speid});
					//update students'info in this collection
					collection.save(upgrade.user,function(err,doc) {
						if (err) {
							console.error(new Date() + err + "\n");
							reject(err);
							upgrade.event.emit("close");
						}
						console.debug(new Date() + "updating collection users succeed..." + "\n");
						console.debug(">>check docs user after updating:",doc + "\n");
						upgrade.event.emit("close");
						resolve(doc);					
					});
				});
			});	
		}// try endding
		catch(e){};
	});	
};



//create prototype read admins' info
User.prototype.admin_get = async function() {
	let admin_get = this;
	return new Promise(async function(resolve,reject) {
		try {
			//open database
			mongo.open(function(err,db) {
				if (err) {
					console.error(new Date() + err + "\n");
					reject(err);
					admin_get.event.emit("close");
				};
				console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
				//read collection users
				db.collection("admins",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						admin_get.event.emit("close");
					}
					console.debug(new Date() + "reading collection users succeed..." + "\n");
					//search students'info in this collection
					collection.findOne({'name': admin_get.admin_name},function(err,doc) {
							if (err) {
								console.error(new Date() + err + "\n");
								reject(err);
								admin_get.event.emit("close");								
							}
							//return search result
							console.debug(">>check param backing doc:",doc + "\n");//wing
							admin_get.event.emit("close");
							resolve(doc);
					});
				});
			});	
		}// try endding
		catch(e){};
	});	
};



//exports class
module.exports = User;