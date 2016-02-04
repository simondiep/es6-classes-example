define(function () {
    'use strict';
    
    /**
    *   Utility to select companies from a list at random
    */
    class RandomCompanySelector {
    
        constructor(companyList) {
            this.companyList = companyList;
        }
        
        // Get a random company that is not bankrupt or return false
        getNotBankruptCompany() {
            var nonBankruptCompanyList = [];
            this.companyList.forEach(function(company) {
                if(!company.isBankrupt()) {
                    nonBankruptCompanyList.push(company);
                }
            });
            if(nonBankruptCompanyList.length > 0) {
                return this._getRandomItemFromArray(nonBankruptCompanyList);
            } else {
                return false;
            }
        }

        // Get a random public company or return false
        getPublicCompany(excludedCompanyId) {
            var publicCompanyList = [];
            this.companyList.forEach(function(company) {
                if(company.isPublic()) {
                    if(excludedCompanyId && company.id == excludedCompanyId) {
                        return;
                    }
                    publicCompanyList.push(company);
                }
            });
            if(publicCompanyList.length > 0) {
                return this._getRandomItemFromArray(publicCompanyList);
            } else {
                return false;
            }
        }

        // Get a random private company or return false
        getPrivateCompany() {
            var privateCompanyList = [];
            this.companyList.forEach(function(company) {
                if(company.isPrivate()) {
                    privateCompanyList.push(company);
                }
            });
            if(privateCompanyList.length > 0) {
                return this._getRandomItemFromArray(privateCompanyList);
            } else {
                return false;
            }
        }
        
        // Get a random product from a predefined product list
        getProduct() {
            return this._getRandomItemFromArray(productList);
        }
        
        _getRandomItemFromArray(array) {
            return array[Math.floor(Math.random() * array.length)];
        }
    }
    
    return RandomCompanySelector;
});