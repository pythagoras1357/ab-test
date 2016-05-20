# ab-test
A simple javascript method to run a/b tests on your site

This is a lightweight method of being able to test different elements of a webpage (different copy, ctas, etc.)
any element can be associated with a test by the addition of a data attribute.

It is required that a method of storing a value is used. The example uses firebase https://firebase.google.com/

The Tests object once initialized, checks to see if a local storage item exists called "test_id", if so it gets that value. This makes sure that the user sees the same test everytime they view the site (provided they don't clear local storage). This way they don't have a confusing site experience seeing different content each time they visit. If the testID does not exists in local storage, Tests calls the db get function that was passed into it on init to get the testID. This was the id set by the last viewer of the page. The test ID is then incremented modulo the number of tests passed into it) then set to the db. numTests = 2 would be a/b, and numTests = 3 would be a/b/c etc. The tests are evenly distributed. With 2 tests, user 1 will see test 0, user 2 will see test 1, user 3 will see test 0, etc.

A basic setup:

First include tests.js in your page


add items to the DOM that have a data attribute assigning them to a test

```
<a data-test-item="0">test A</a>
<a data-test-item="1">test B</a>
```

inititalize Tests
```javascript
 var testSet = function(value) {
        // add your function to store the value somewhere
    }
 var testGet = function(callback) {
    	// add your function to get the stored value
    	// the callback is what is called once the value is returned
    	// defined in tests.js as Tests.generateNewTestID to generate a new id from the retrieved one
    	// function gets value then calls the callback
    	callback(value); //mandatory
    }
//Tests.init(getter,setter,numTests);
Tests.init(testGet, testSet, 2);
```

