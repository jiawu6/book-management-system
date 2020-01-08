//import outside modules
var mongo = require("../db");
var set = require("../setting.js");
//import module events
const events = require("events");


//quick -- database's storing
async function save() {
 	// info that will be sent
	var book = {
		name: 'wing',
		author: 'Charlotte Brontë',
		isbn: '978-6-02-089126-2',
		price: '￡78.00',
		press: 'Smith, Elder | London',
		introduction: 'The first American edition was published the following year by Harper & Brothers of New York. Jane Eyre follows the experiences of...'
	};

	var admin = {
		name: 'testuser1',
		password: 'testing1'
	};

	// var user = {"studentid":"testing1","password":"testing1","name":"testuser1","mobile":"1234567890"};
	var user = {"studentid":"testing2","password":"testing1","name":"testuser1","mobile":"1234567890"};

	console.debug(">>check param storeinfos:",JSON.stringify(user) + "\n");//wing

	//open database
	mongo.open(function(err,db) {
		if (err) {
			console.error(new Date() + err + "\n");
			db.close();
		};
		console.debug(new Date() + "listening port 27017,database opening now..." + "\n");
		//read collection users
		db.collection("users",function(err,collection) {
			if (err) {
				console.error(new Date() + err + "\n");
				db.close();
			}
			console.debug(new Date() + "reading collection users succeed..." + "\n");
			//store students'info to this collection
			collection.insert(user,{
				safe: true
			},function(err,doc) {
				if (err) {
					console.error(new Date() + err + "\n");
					db.close();			
				};
				console.debug(new Date() + "storing infos succeed..." + "\n");
				console.debug(">>check param backingdocs if is object:",doc + "\n");//wing
				db.close();
			});
		});
	});	
};


//start
save();