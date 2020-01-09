//import module assert
const assert = require('assert');
//import test javascript
const details_stu = require('../models/searchbooks_stu.js');

//create a new sample!
var test_searchbooks_stu = new details_stu('e','Jane Eyre');

//try test
describe('#test searchbooks_stu.js',async () => {
	beforeEach(function () {
        console.info('start test now,good luck...' + "\n");
    });	
    describe('#test function search()',async () => {
    	//first example
        it('the length of return doc should equal to 3',async () => {
        	let result = await test_searchbooks_stu.search();
            assert.strictEqual((result.length==3),true);
        });
    });

    describe('#test function specificsearch()',async () => {
        //first example
        it('return should not be null',async () => {
            let result = await test_searchbooks_stu.specificsearch();
            assert.strictEqual((result!= null),true);
        });
    }); 

    describe('#test function bookup()',async () => {
        //first example
        it('the length of return should not be 1',async () => {
            let result = await test_searchbooks_stu.bookup('Emily Bonte','978-7-03-049030-8','￡68.00','Thomas Cautley Newby | London','Wuthering Heights is the work of Emily Bronte, one of the Bronte sisters, and one of the representative works of English literature...','A2681241','Room501AreaB','paperbook',null,'exist');
            assert.strictEqual((result.length==1),false);
        });
    }); 

    describe('#test function searchall()',async () => {
        //first example
        it('the first result of this array that name equal to Wuthering Heights',async () => {
            let result = await test_searchbooks_stu.searchall();
            assert.strictEqual((result[0].name=='Wuthering Heights'),true);
        });
    });  

    describe('#test function deleting()', () => {
        //first example
        it('return should not be null',async () => {
            let result = await test_searchbooks_stu.deleting('wing');
            assert.strictEqual((result!=null),true);
        });
    });  
});