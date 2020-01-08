//import module superagent
const request = require('superagent');
//denfine general string
const str = "http://localhost:5000";

describe('test open all web pages',function () {
   beforeEach(function () {
    console.info("test start now,good luck\n");
   });

   it('GET /',function (done) {
       request
           .get(str)
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });

   it('GET /login',function (done) {
       request
           .get(str + '/login')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });   

   it('POST /login',function (done) {
       request
           .post(str + '/login')
           .send({'studentid': 'testing1','password': 'testing1'})
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });  

   it('GET /logout',function (done) {
       request
           .get(str + '/logout')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });   

   it('POST /details',function (done) {
       request
           .post(str + '/login')
           .send({'q': 'e'})
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   }); 

   it('GET /search',function (done) {
       request
           .get(str + '/search')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });  

   it('GET /specific',function (done) {
       request
           .get(str + '/specific?studentid=' + 'testing1' + '&' + 'bookname=' + 'Pride and Prejudice')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });  

   it('GET /setting',function (done) {
       request
           .get(str + '/setting?studentid=' + 'testing1')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });   

   it('POST /setting',function (done) {
       request
           .post(str + '/setting?studentid=' + 'testing1')
           .send({'name': 'testuser1','mobile': '1234567890','password': 'testing1'})
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   }); 

   it('GET /chatroom',function (done) {
       request
           .get(str + '/setting?studentid=' + 'testing1' + '&' + 'bookname=' + 'Pride and Prejudice')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });   

   it('GET /admin',function (done) {
       request
           .get(str + '/admin')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });  

   it('POST /admin',function (done) {
       request
           .post(str + '/admin')
           .send({'admin_name': 'testuser1','admin_password': 'testing1'})
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });

   it('GET /admin/logout',function (done) {
       request
           .get(str + '/admin/logout')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });

   it('GET /admin/regist-student',function (done) {
       request
           .get(str + '/admin/regist-student')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   }); 

   it('GET /admin/edit-info',function (done) {
       request
           .get(str + '/admin/edit-info?' + 'studentid=' + 'testing1')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   }); 

   it('GET /do-books',function (done) {
       request
           .get(str + '/do-books')
           .end(function (err,data) {
                if (err) {
                    done(err);
                }
               done();
           })
   });                                    
})