var requirejs = require("requirejs");
var assert = require("chai").assert;

requirejs.config({
    baseUrl: "./js/app",
    nodeRequire: require
});

var BusinessWorld = requirejs("business-world");

describe("BusinessWorld", function() {
    "use strict";
    
    let businessWorld;
    const NUMBER_OF_COMPANIES_TO_TEST = 1000;
    
    before(function() {
        BusinessWorld.prototype._addButtonClickHandlers = function(){};
    });
    
    beforeEach(function() {
        let businessWorldView = { getCompanyNameInputValue : function(){return 'abc';}, renderCompanyList : function(){}, clearCompanyNameInputValue : function(){}};
        businessWorld = new BusinessWorld(businessWorldView);
    });
    
    it("should create a new company", function(done) {
        assert.equal(businessWorld.companyList.length, 0);
        businessWorld.createCompany();
        assert.equal(businessWorld.companyList.length, 1);
        businessWorld.createCompany();
        assert.equal(businessWorld.companyList.length, 2);
        done();
    });
    
    it("should bankrupt a random company", function(done) {
        businessWorld.createCompany();
        assert.equal(businessWorld.companyList.length, 1);
        assert.isFalse(businessWorld.companyList[0].isBankrupt());
        
        businessWorld.bankruptRandomCompany();
        assert.isTrue(businessWorld.companyList[0].isBankrupt());
        
        for(let i=1; i < NUMBER_OF_COMPANIES_TO_TEST; i++) {
            businessWorld.createCompany();
        }
        
        for(let i=1; i < NUMBER_OF_COMPANIES_TO_TEST; i++) {
            businessWorld.bankruptRandomCompany();
        }
        
        for(let i=0; i < NUMBER_OF_COMPANIES_TO_TEST; i++) {
            assert.isTrue(businessWorld.companyList[i].isBankrupt());
        }
        done();
    });
    
    it("should add a product a random company", function(done) {
        global.productList = ['prod1', 'prod2'];
        
        businessWorld.createCompany();
        assert.equal(businessWorld.companyList.length, 1);
        assert.equal(businessWorld.companyList[0].assets.length, 0);
        
        businessWorld.addProductToRandomCompany();
        assert.equal(businessWorld.companyList[0].assets.length, 1);
        
        let NUMBER_OF_PRODUCTS = 2000;
        
        for(let i=1; i < NUMBER_OF_COMPANIES_TO_TEST; i++) {
            businessWorld.createCompany();
        }
        
        for(let i=1; i < NUMBER_OF_PRODUCTS; i++) {
            businessWorld.addProductToRandomCompany();
        }
        
        let totalProducts = 0;
        for(let i=0; i < NUMBER_OF_COMPANIES_TO_TEST; i++) {
            totalProducts += businessWorld.companyList[i].assets.length;
        }
        assert.equal(totalProducts, NUMBER_OF_PRODUCTS);
        done();
    });
    
    it("should make a random company public", function(done) {
        businessWorld.createCompany();
        assert.equal(businessWorld.companyList.length, 1);
        assert.isFalse(businessWorld.companyList[0].isPublic());
        
        businessWorld.makeRandomCompanyPublic();
        assert.isTrue(businessWorld.companyList[0].isPublic());
        
        for(let i=1; i < NUMBER_OF_COMPANIES_TO_TEST; i++) {
            businessWorld.createCompany();
        }
        
        for(let i=1; i < NUMBER_OF_COMPANIES_TO_TEST; i++) {
            businessWorld.makeRandomCompanyPublic();
        }
        
        for(let i=0; i < NUMBER_OF_COMPANIES_TO_TEST; i++) {
            assert.isTrue(businessWorld.companyList[i].isPublic());
        }
        done();
    });
    
    it("should merge two random public companies", function(done) {
        businessWorld.createCompany();
        businessWorld.createCompany();
        assert.equal(businessWorld.companyList.length, 2);
        let company1Name = businessWorld.companyList[0].name;
        let company2Name = businessWorld.companyList[1].name;
        businessWorld.companyList[0].addProduct('a');
        businessWorld.companyList[0].addProduct('b');
        businessWorld.companyList[1].addProduct('c');
        
        assert.isFalse(businessWorld.companyList[0].isPublic());
        assert.isFalse(businessWorld.companyList[1].isPublic());
        
        businessWorld.mergeTwoRandomPublicCompanies();
        assert.equal(businessWorld.companyList.length, 2);
        
        businessWorld.makeRandomCompanyPublic();
        businessWorld.makeRandomCompanyPublic();
        businessWorld.mergeTwoRandomPublicCompanies();
        assert.equal(businessWorld.companyList.length, 1);
        assert.equal(businessWorld.companyList[0].name, company1Name+' '+company2Name);
        assert.deepEqual(businessWorld.companyList[0].assets, ['a','b','c']);
        done();
    });
});