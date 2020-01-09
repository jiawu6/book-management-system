//import module assert
const assert = require('assert');
//import test javascript
const add = require('../models/user.js');

//create a new sample
var test_user = new add('testing1','testing1','testuser1','1234567890','testuser1','testing1');

//try testing
describe('#test user.js', () => {
	beforeEach(function () {
        console.info('start test now,good luck...' + "\n");
    });	
    describe('#test function save()', () => {
    	//first example
        it('return should not be null',async () => {
        	let result = await test_user.save();
            assert.strictEqual((result!=null),true);
        });
    });

    describe('#test function get()', () => {
        //first example
        it('return should not be null',async () => {
            let result = await test_user.get();
            assert.strictEqual((result!=null),true);
        });
    }); 

    describe('#test function upgrade()', () => {
        //first example
        it('return should not be null',async () => {
            let result = await test_user.upgrade('testuser1','1234567890','testing1','testing1','borrow');
            assert.strictEqual((result!=null),true);
        });
    }); 

    describe('#test function admin_get()', () => {
        //first example
        it('return should not be null',async () => {
            let result = await test_user.admin_get();
            assert.strictEqual((result!=null),true);
        });
    });     
});