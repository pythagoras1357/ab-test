# ab-test
A simple javascript method to run a/b tests on your site

This is a lightweight method of being able to test different elements of a webpage (different copy, ctas, etc.)
any element can be associated with a test by the addition of a data attribute.

It is required that a method of storing an integer value is used. The exampe uses firebase https://firebase.google.com/

A basic setup:

First include tests.js in your page

<script src="tests.js"></script>

<script>
 var testSet = function(value) {
        // add your function to store the value somewhere
    }
 var testGet = function(callback) {
    	// add your function to get the stored value
    	// the callback is what is called once the value is returned
    	// define in tests.js as Tests.generateNewTestID to generate a new id from the retrieved one
    }
//Tests.init(getter,setter,numTests);
Tests.init(testGet, testSet, 2);
</script>