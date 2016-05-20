var Tests = {
    // numTests is number of different test states, numTests = 2 is a/b, numTests = 3 is a/b/c
    // they are distributed evenly so numTests = 2 is 50/50, numTests = 3 is 33/33/33, etc
    numTests: 2,
    // testID should be defined as it will be default in case of an error
    testID: 0,
    dbGetfunction: function() {
        console.log("dbGetfunction not set");
        return 1;
    },
    dbSetfunction: function(value) {
        console.log("dbSetfunction not set");
    },
    init: function(getter, setter, numTests) {
        this.dbGetfunction = getter;
        this.dbSetfunction = setter;
        this.numTests = numTests
            // remove local storage check for testing
            //if (1 == 1) {
        if (localStorage.getItem("test_id") === null) {
            this.dbGetfunction(this.generateNewTestID);
        } else {
            this.testID = parseInt(localStorage.getItem("test_id"));
            this.showTestItems();
        }
    },
    generateNewTestID: function(idFromDB) {
        console.log("generateNewTestID:" + idFromDB)
        if (idFromDB == "error getting testID") {
            throw new Error("error getting testID");
        } else {
            Tests.testID = (parseInt(idFromDB) + 1) % Tests.numTests;
            localStorage.setItem("test_id",Tests.testID)
            Tests.showTestItems();
        }
    },
    showTestItems: function() {
        this.dbSetfunction(this.testID);
        // hide anything that has a test ID other than this.testID
        var testItems = document.querySelectorAll('[data-test-item]');

        for (var i = 0; i < testItems.length; i++) {
            if (testItems[i].getAttribute('data-test-item') != this.testID) {
                testItems[i].parentNode.removeChild(testItems[i]);
            }
        }
    }
}