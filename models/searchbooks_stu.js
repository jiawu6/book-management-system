//import outside modules
var mongo = require("./db");
var set = require("./setting.js");
//import module events
const events = require("events");

//build a main class
function details_stu(keyword,reqstr) {
	this.event = new events.EventEmitter();
	this.event.on("close",function() {
		console.debug(new Date() + "something touch close,database closing now..." + "\n");
		mongo.close();
	});

	//define param from client's form
	this.keyword = keyword;
	console.debug('>>check param keyword:',this.keyword + "\n");//wing
	this.reqstr = reqstr;		
	console.debug('>>check param request string:',this.reqstr + "\n");//wing

	this.bookinfo = null;
}


//create prototype search specific book
details_stu.prototype.search = async function() {
	let search = this;
	//use promise ensure the data comeback
	return new Promise(async function(resolve,reject) {
		try {
			//open database
			mongo.open(function(err,db) {
				if (err) {
					console.error(new Date() + err + "\n");
					search.event.emit("close");
					reject(err);
				};
				console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
				//read collection users
				db.collection("books",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						search.event.emit("close");
					}
					console.debug(new Date() + "reading collection books succeed..." + "\n");
					//search books'info in this collection

					/** method of find **/
					collection.find({'name': {$regex: search.keyword}}).toArray(function(err,docs) {
						if (err) {
							console.error(new Date() + err + "\n");
							reject(err);
							search.event.emit("close");
						};
						search.event.emit("close");
						resolve(docs); // the array object
					});				

					/** method of findOne **/
					// collection.findOne({'studentid': search.studentid},function(err,doc) {
					// 		if (err) {
					// 			console.error(new Date() + err + "\n");
					// 			reject(err);
					// 			search.event.emit("close");								
					// 		}
					// 		//return search result
					// 		console.debug(">>check param doc:",doc.name + "\n");//wing
					// 		search.event.emit("close");
					// 		resolve(doc);
					// });

				});
			});	
		}// try endding
		catch(e){};
	});	
};


//create prototype search books more details
details_stu.prototype.specificsearch = async function() {
	let specific = this;
	//use promise ensure the data comeback
	return new Promise(async function(resolve,reject) {
		try {
			//open database
			mongo.open(function(err,db) {
				if (err) {
					console.error(new Date() + err + "\n");
					specific.event.emit("close");
					reject(err);
				};
				console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
				//read collection users
				db.collection("books",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						specific.event.emit("close");
					}
					console.debug(new Date() + "reading collection books succeed..." + "\n");
					//specific books'info in this collection

					/** method of find **/
					// collection.find({'name': {$regex: specific.keyword}}).toArray(function(err,docs) {
					// 	if (err) {
					// 		console.error(new Date() + err + "\n");
					// 		reject(err);
					// 		specific.event.emit("close");
					// 	};
					// 	specific.event.emit("close");
					// 	resolve(docs); // the array object
					// });				

					/** method of findOne **/
					collection.findOne({'name': specific.reqstr},function(err,doc) {
							if (err) {
								console.error(new Date() + err + "\n");
								reject(err);
								specific.event.emit("close");								
							}
							//return specific result
							console.debug(">>check param doc:",doc + "\n");//wing
							specific.event.emit("close");
							resolve(doc);
					});
				});
			});	
		}// try endding
		catch(e){};
	});		
};


//create prototype update specific book
details_stu.prototype.bookup = async function(author,isbn,price,press,introduction,id,place,type,status,spestatus) {
	let up = this;
	console.debug(">>check param of book status:",status + "\n");//wing

	//reset status
	if (!spestatus) {
		if (status == 'exist') {
			status = 'borrowed';
		}
		else {
			status = 'exist';
		};
	}
	else {
		status = spestatus;
	};

	//define update data object
	up.bookinfo = {
		"name":up.reqstr,
		"author":author,
		"isbn":isbn,
		"price":price,
		"press":press,
		"introduction":introduction,
		"id":id,
		"place":place,
		"type":type,
		"status":status
	};

	return new Promise(async function(resolve,reject) {
		try {
			//open database
			mongo.open(function(err,db) {
				if (err) {
					console.error(new Date() + err + "\n");
					reject(err);
					up.event.emit("close");
				};
				console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
				//read collection users
				db.collection("books",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						up.event.emit("close");
					}
					console.debug(new Date() + "reading collection books succeed..." + "\n");
					//delete old data
					collection.remove({'name': up.reqstr});
					//update students'info in this collection
					collection.save(up.bookinfo,function(err,doc) {
						if (err) {
							console.error(new Date() + err + "\n");
							reject(err);
							up.event.emit("close");
						}
						console.debug(new Date() + "updating collection books succeed..." + "\n");
						console.debug(">>check docs user after updating:",doc + "\n");
						up.event.emit("close");
						resolve(doc);					
					});
				});
			});	
		}// try endding
		catch(e){};
	});		
};


//create prototype searchall to form list
details_stu.prototype.searchall = async function() {
	let searchall = this;
	//use promise ensure the data comeback
	return new Promise(async function(resolve,reject) {
		try {
			//open database
			mongo.open(function(err,db) {
				if (err) {
					console.error(new Date() + err + "\n");
					searchall.event.emit("close");
					reject(err);
				};
				console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
				//read collection users
				db.collection("books",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						searchall.event.emit("close");
					}
					console.debug(new Date() + "reading collection books succeed..." + "\n");
					//searchall books'info in this collection

					/** method of find **/
					collection.find().toArray(function(err,docs) {
						if (err) {
							console.error(new Date() + err + "\n");
							reject(err);
							searchall.event.emit("close");
						};
						searchall.event.emit("close");
						resolve(docs); // the array object,use [i] to index
					});				

					/** method of findOne **/
					// collection.findOne({'studentid': searchall.studentid},function(err,doc) {
					// 		if (err) {
					// 			console.error(new Date() + err + "\n");
					// 			reject(err);
					// 			searchall.event.emit("close");								
					// 		}
					// 		//return searchall result
					// 		console.debug(">>check param doc:",doc.name + "\n");//wing
					// 		searchall.event.emit("close");
					// 		resolve(doc);
					// });

				});
			});	
		}// try endding
		catch(e){};
	});	
};


//create prototype delete specific book
details_stu.prototype.deleting = async function(bookname) {
	let deleting = this;
	console.debug(">>check param of book name for deleting:",bookname + "\n");//wing

	return new Promise(async function(resolve,reject) {
		try {
			//open database
			mongo.open(function(err,db) {
				if (err) {
					console.error(new Date() + err + "\n");
					reject(err);
					deleting.event.emit("close");
				};
				console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
				//read collection users
				db.collection("books",function(err,collection) {
					if (err) {
						console.error(new Date() + err + "\n");
						reject(err);
						deleting.event.emit("close");
					}
					console.debug(new Date() + "reading collection books succeed..." + "\n");
					//delete old data
					collection.remove({'name': bookname});
					deleting.event.emit("close");
					resolve("deleting for admin finished!");
				});
			});	
		}// try endding
		catch(e){};
	});		
};




//exports class
module.exports = details_stu;