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
        // remove cookie check for testing
        //if (1 == 1) {
        if (!this.getCookie("test_id") || this.getCookie("test_id")==""){
            this.dbGetfunction(this.generateNewTestID);

        } else {
            this.testID = parseInt(this.getCookie("test_id"));
            this.showTestItems();
        }
    },
    generateNewTestID: function(idFromDB) {
        console.log("generateNewTestID:" + idFromDB)
        if (idFromDB == "error getting testID") {
            throw new Error("error getting testID");
        } else {
            Tests.testID = (parseInt(idFromDB) + 1) % Tests.numTests;
            Tests.setCookie("test_id", Tests.testID, 30);
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
    },
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        // make sure the cookie path is set to avoid path specific cookies
        document.cookie = cname + "=" + cvalue + ";path=/; " + expires;
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
}
    //Tests.init(getter,setter,numTests);
