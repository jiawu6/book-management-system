//import outside modules
var User = require("../models/User.js");
var book_stu = require("../models/searchbooks_stu.js");

//render
module.exports = function(app) {

	//routes design

		//student

		app.get("/",function(req, res){
			if (req.query.studentid != null) {
				console.debug('>>check param studentid come in:',req.query.studentid + "\n");//wing	
				//take this key param to other page like 'setting'
				var studentid = req.query.studentid;
	  			return res.render('index', { title: 'Books Manager',user: req.session.user,studentid: studentid });
			};
	  		return res.render('index', { title: 'Books Manager',user: req.session.user,studentid: undefined });
		});

		app.get("/login",function(req, res){
	  		res.render('login', { title: 'Books Manager' });
		});	
		app.post("/login",async function(req, res){

			//define search data
			var studentid = req.body.studentid;
			var password = req.body.password;
			console.debug('>>check param studentid:',studentid + "\n");//wing			

			//create the class
			var login = new User(studentid,password,null,null);

			//check if the student has existed
			var studentinfo = await login.get();
			console.debug('>>check param dbinfo:',studentinfo + "\n");//wing
			if (!studentinfo) {
				req.flash('error','this studentid has not existed!');
				//back to login
				return res.redirect('/login');				
			}
			//identify the user
			else {
				if (studentinfo.password != password) {
					req.flash('error','password is wrong!');
					//back to login
					return res.redirect('/login');						
				}
				else {
					//put the user into session
					req.session.user = studentinfo;
					req.flash('success','login!');
					//back to login
					return res.redirect('/?studentid='+ studentid +'');							
				};
			};		
		});			

		app.get("/logout",function(req,res) {
			//delete the session
			req.session.user = null;
			req.flash('success','logout!');
			//goto index
			res.redirect('/');
		});

		app.post("/details",async function(req,res) {

			console.debug(">>check the studentid come in details:",req.query.studentid + "\n");
			var studentid = req.query.studentid;

			//define search data
			var bookname = req.body.q;
			var name = [];
			var author = [];
			var isbn = [];
			var price = [];
			var press = [];
			var introduction = [];
			var count = null;
			console.debug('>>check param bookname:',bookname + "\n");//wing			

			//create the class
			var details_stu = new book_stu(bookname,null);

			//query databse to get data
			var details = await details_stu.search();
			// console.debug('>>check param back docs:',details[0].name + "\n");//wing			

			for(var i = 0;i < details.length;i++) {
				name.push(details[i].name);
			};
			for(var i = 0;i < details.length;i++) {
				author.push(details[i].author);
			};
			for(var i = 0;i < details.length;i++) {
				isbn.push(details[i].isbn);
			};
			for(var i = 0;i < details.length;i++) {
				price.push(details[i].price);
			};
			for(var i = 0;i < details.length;i++) {
				press.push(details[i].press);
			};	
			for(var i = 0;i < details.length;i++) {
				introduction.push(details[i].introduction);
			};															

			count = details.length;

			res.render('details', { 
				title: 'Books Manager',
				user: req.session.user,
				studentid: studentid,
				bookname: bookname,
				name: name,
				author: author,
				ISBN: isbn,
				Price: price,
				press: press,
				Introduction: introduction,
				count: count
			});
		});

		app.get("/search",function(req,res) {

			console.debug(">>check the studentid come in search:",req.query.studentid + "\n");
			var studentid = req.query.studentid;

			res.render('search',{ title: 'Books Manager',user: req.session.user,studentid: studentid });
		});

		app.get("/specific",async function(req,res) {

			console.debug('>>check param req studentid:',req.query.studentid + "\n");//wing
			console.debug('>>check param req bookname:',req.query.bookname + "\n");//wing

			//define student search data
			var studentid = req.query.studentid;
			//define books search data
			var name = req.query.bookname;
			var author = null;
			var isbn = null;
			var price = null;
			var press = null;
			var introduction = null;
			var id = null;
			var place = null;
			var type = null;
			var status = null;
			console.debug('>>check param name:',name + "\n");//wing			

			//create the class
			var checking = new User(studentid,null,null,null);

			//check if the student has existed
			var stuinfo = await checking.get();
			console.debug('>>check param dbinfo:',stuinfo + "\n");//wing

			if (!stuinfo) {
				var userdo = null;
			}
			else {
				var userdo = stuinfo.operation;
			};

			//create the class
			var spedetails_stu = new book_stu(null,name);

			//query databse to get data
			var spedetails = await spedetails_stu.specificsearch();
			console.debug('>>check param back docs:',spedetails.author + "\n");//wing

			author = spedetails.author;
			isbn = spedetails.isbn;
			price = spedetails.price;
			press = spedetails.press;
			introduction = spedetails.introduction;
			//new data
			id = spedetails.id;
			place = spedetails.place;
			type = spedetails.type;
			status = spedetails.status;

			res.render('specific',{ 				
				title: 'Books Manager',
				user: req.session.user,
				studentid: studentid,
				userdo: userdo,
				name: name,
				author: author,
				ISBN: isbn,
				Price: price,
				press: press,
				Introduction: introduction,
				id: id,
				place: place,
				type: type,
				status: status 
			});
		});
		app.get("/transparent",async function(req,res) {

			console.debug('>>check param bookname come in:',req.query.bookname + "\n");//wing
			console.debug('>>check param studentid come in:',req.query.studentid + "\n");//wing
			console.debug('>>check param operation come in:',req.query.operation + "\n");//wing

			var studentid = req.query.studentid;
			var operation = req.query.operation;
			var name = req.query.bookname;
			var author = req.query.author;
			var isbn = req.query.isbn;
			var price = req.query.price;
			var press = req.query.press;
			var introduction = req.query.introduction;
			var id = req.query.id;
			var place = req.query.place;
			var type = req.query.type;
			var status = req.query.status;

			//create the class
			var up_op = new User(studentid,null,null,null,null,null);

			//attain specific student's info
			var stubasicinfo = await up_op.get();
			console.debug('>>check param info of db of stu:',stubasicinfo + "\n");//wing

			stuname = stubasicinfo.name;
			mobile = stubasicinfo.mobile;
			password = stubasicinfo.password;			

			//update specific student's info after do-books
			var upgrade = await up_op.upgrade(stuname,mobile,password,null,operation);
			console.debug('>>check param info of db of student:',upgrade + "\n");//wing			

			//create the class
			var update_book = new book_stu(null,name);

			//query databse to update data
			var afterup = await update_book.bookup(author,isbn,price,press,introduction,id,place,type,status);
			console.debug('>>check param back update docs:',afterup + "\n");//wing

			//reload page '/specific'
			var url = '/specific?' + 'bookname=' + name;
			return res.redirect(url);
		});

		app.get("/setting",async function(req,res) {

			console.debug('>>check param studentid come in:',req.query.studentid + "\n");//wing

			//define data to query
			var studentid = req.query.studentid;
			var name = null;
			var mobile = null;
			var password = null;

			//create the class
			var setting = new User(studentid,null,null,null,null,null);

			//attain specific student's info
			var stubasicinfo = await setting.get();
			console.debug('>>check param info of db of stu:',stubasicinfo.password + "\n");//wing

			name = stubasicinfo.name;
			mobile = stubasicinfo.mobile;
			password = stubasicinfo.password;

			return res.render('setting',{ 
				title: 'Books Manager',
				user: req.session.user,
				name: name,
				mobile: mobile,
				studentid: studentid,
				password: password
			});
		});
		app.post("/setting",async function(req,res) {

			console.debug('>>check param studentid come form GET:',req.query.studentid + "\n");//wing
			var studentid = req.query.studentid;

			//receive data to update
			var name = req.body.name;
			var mobile = req.body.mobile;
			var password = req.body.password;

			//judge if user edited
			if (!name) {
				var name = req.query.name;
			};
			if (!mobile) {
				var mobile = req.query.mobile;
			};
			if (!password) {
				var password = req.query.password;
			};

			//create the class
			var up = new User(studentid,null,null,null,null,null);

			//update specific student's info
			var upgrade = await up.upgrade(name,mobile,password);
			console.debug('>>check param info of db of student:',upgrade + "\n");//wing

			var str = '/setting?' + 'studentid=' + studentid;
			return res.redirect(str);
		});

		app.get("/chatroom",function(req,res) {

			console.debug(">>check chatroom's bookname:",req.query.bookname);
			var studentid = req.query.studentid;
			var bookname = req.query.bookname;

			res.render("chatroom",{
				title: 'Books Manager',
				user: req.session.user,
				studentid: studentid,
				bookname: bookname
			});
		});


		//administrator

		app.get("/admin",function(req,res) {
			res.render('admin_login',{title: 'Books Manager',admin: req.session.admin });
		});
		app.post("/admin",async function(req,res) {

			//define search data
			var admin_name = req.body.admin_name;
			var admin_password = req.body.admin_password;
			console.debug('>>check param admin_password:',admin_password + "\n");//wing			

			//create the class
			var admin_login = new User(null,null,null,null,admin_name,admin_password);

			//check if the student has existed
			var admininfo = await admin_login.admin_get();
			console.debug('>>check param info form db:',admininfo + "\n");//wing
			if (!admininfo) {
				req.flash('error','this admin_name has not existed!');
				//back to login
				return res.redirect('/admin');				
			}
			//identify the user
			else {
				if (admininfo.password != admin_password) {
					req.flash('error','password is wrong!');
					//back to login
					return res.redirect('/admin');						
				}
				else {
					//put the user into session
					req.session.admin = admininfo;
					req.flash('success','login!');
					//back to mainpage
					// return res.redirect('/admin');
					//open logout
					return res.render('admin_login',{title: 'Books Manager',admin: req.session.admin });
				};
			};		
		});

		app.get("/admin/logout",function(req,res) {
			//delete the session
			req.session.user = null;
			req.flash('success','logout!');
			//goto index
			res.redirect('/admin');
		});		

		app.get("/admin/regist-student",function(req,res) {
			res.render('admin_regist_student',{title: 'Books Manager',admin: req.session.admin });
		});
		app.post("/admin/regist-student",async function(req,res) {

			//read client form's name
			console.debug('>>check param req.body:' + req.body + "\n");//wing
			var studentid = req.body.studentid;
			var password = req.body.password;
			var re_password = req.body.repassword;
			var name = req.body.name;
			var mobile = req.body.mobile;

			//check if twice password are the same
			if (re_password != password || password == null) {
				req.flash('error','Entered passwords differ!');
				//back to register
				return res.redirect('/admin/regist-student');
			}

			else {
				//create a new user
				var newborn = new User(studentid,password,name,mobile);

				console.debug('>>check param studentinfo:',newborn + "\n");//wing

				//check if the student has existed
				var existed = await newborn.get();
					if (existed) {
						req.flash('error','this studentid has existed!');
						//back to register
						return res.redirect('/admin/regist-student');				
					};
					//create a new user
					var saving = await newborn.save();
						if (!saving) {
							req.flash('error','this studentid has existed!');
							//back to register
							return res.redirect('/admin/regist-student');						
						};
						//put the user info into session
						req.session.user = saving;
						req.flash('success','you create a new account!');
						return res.redirect('/admin/regist-student');
			};
		});

		app.get("/admin/edit-info",async function(req,res) {

			console.debug('>>check param query string of admin:',req.query.op + '|||||' + req.query.studentid + "\n");//wing
			if (req.query.op != 'edit') {
				var reqstr = null;
			}
			else {
				var reqstr = req.query.op;
			};

			if (!req.query.studentid) {
				var studentid = null;
			}
			else {
				var studentid = req.query.studentid;
			};

			//receive data to query
			// var name = req.body.name;
			// var mobile = req.body.mobile;
			// var password = req.body.password;

			//create the class
			var admin_get = new User(studentid,null,null,null,null,null);

			//query specific student's info
			var edit_info = await admin_get.get();
			console.debug('>>check param info of db of student:',edit_info + "\n");//wing

			if (!edit_info) {
				var name = null;
				var mobile = null;
				var password = null;
			}
			else {
				var name = edit_info.name;
				var mobile = edit_info.mobile;
				var password = edit_info.password;		
			};

			return res.render('admin_edit_info',{
				title: 'Books Manager',
				admin: req.session.admin,
				opstring: reqstr,
				studentid: studentid,
				name: name,
				mobile: mobile,
				password: password
			});
		});
		app.post("/admin/edit-info",async function(req,res) {

			console.debug('>>check param studentid come form form:',req.query.studentid + "\n");//wing

			//receive data to update
			var studentid = req.body.studentid;
			var name = req.body.name;
			var mobile = req.body.mobile;
			var password = req.body.password;

			//judge if user edited
			if (!studentid) {
				var studentid = req.query.studentid;
				var speid = null;
			}
			else {
				var studentid = req.body.studentid;
				// create index
				var speid = req.query.studentid;
			};	
			if (!name) {
				var name = req.query.name;
			};
			if (!mobile) {
				var mobile = req.query.mobile;
			};
			if (!password) {
				var password = req.query.password;
			};

			//create the class
			var operation = new User(studentid,null,null,null,null,null);

			//operate specific student's info
			var upgrade = await operation.upgrade(name,mobile,password,speid);
			console.debug('>>check param info of db of student:',upgrade + "\n");//wing

			var str = '/admin/edit-info?' + 'studentid=' + studentid;
			return res.redirect(str);
		});

		app.get("/do-books",async function(req,res) {

			//search all books
			 //create main class
			 var searchall = new book_stu(null,null);
			 var allbooks = await searchall.searchall();
			 console.debug(">>check allbooks list,not null:",allbooks + "\n"); //wing
			 //judge books we have now
			 if (!allbooks) {
			 	//booklist shouldn't null
			 	var newsList = [{
									name:"",
									author:"",
									isbn:"",
									price:"",
									press:"",
									introduction:"",
									id:"",
									place:"",
									type:"",
									status:""
								}];
			 }
			 else {
			 	//should use JSON.stringify
			 	var newsList = JSON.stringify(allbooks);
			 };

			 console.debug(">>check bookslist's structure:",allbooks + "\n"); //wing

			return res.render('admin_do_books',{
				title: 'Books Manager',
				admin: req.session.admin,
				newsList: newsList,
			});
		});
		app.post("/do-books",async function(req,res) {

			//receive html-form data
			var name = req.query.name;
			var author = req.query.author;
			var isbn = req.query.isbn;
			var price = req.query.price;
			var press = req.query.press;
			var introduction = req.query.introduction;
			var id = req.query.id;
			var place = req.query.place;
			var type = req.query.type;
			var spestatus = req.query.status;
			console.debug(">>check the query string about new book:",spestatus);

			//create main class
			var add = new book_stu(null,name);
			var addbooks = await add.bookup(author,isbn,price,press,introduction,id,place,type,null,spestatus);
			console.debug(">>check the result comes from books up:",addbooks);

			return res.redirect("/do-books");
		});
		app.get("/admin-delete-books",async function(req,res) {
			
			console.debug("check come in bookname:",req.query.bookname);

			//create main class
			var delt = new book_stu();
			//delete specific book
			var finish = await delt.deleting(req.query.bookname);
			console.debug("check if finish delete:",finish);

			//reload page
			res.redirect("/do-books");
		});
		app.get("/admin-edit-books",async function(req,res) {

			console.debug("check admin-edit-books query str:",req.query.name);
			//receive html-location data
			var name = req.query.name;
			var author = req.query.author;
			var isbn = req.query.isbn;
			var price = req.query.price;
			var press = req.query.press;
			var introduction = req.query.introduction;
			var id = req.query.id;
			var place = req.query.place;
			var type = req.query.type;
			var spestatus = req.query.status;
			console.debug(">>check the query string about edited book:",spestatus);		

			//create main class
			var edit = new book_stu(null,name);
			var editbooks = await edit.bookup(author,isbn,price,press,introduction,id,place,type,null,spestatus);
			console.debug(">>check the result comes from books up:",editbooks);

			return res.redirect("/do-books");				
		});
};