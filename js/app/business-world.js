define([
  'app/business-world-view',
  'app/company',
  'app/random-company-selector'
],

function (BusinessWorldView, Company, RandomCompanySelector) {
'use strict';

    /**
    *   Controller
    */
    class BusinessWorld {

        constructor() {
            this.companyList = [];
            this.businessWorldView = new BusinessWorldView(this);
            this.randomCompanySelector = new RandomCompanySelector(this.companyList);
        }
        
        createCompany() {
            var newCompanyName = this.businessWorldView.getCompanyNameInputValue();
            if(newCompanyName) {
                this.companyList.push(new Company(newCompanyName));
                this.businessWorldView.renderCompanyList();
                // Clear input
                this.businessWorldView.clearCompanyNameInputValue();
            } else {
                // POTENTIAL-FEATURE Integrate Toast messaging to display these messages
                console.log('Could not create a company.  Company name required.');
            }
        }

        // Choose a random non-bankrupt company and bankrupt it
        bankruptRandomCompany() {
            var company = this.randomCompanySelector.getNotBankruptCompany();
            if(company) {
                company.goBankrupt();
                this.businessWorldView.renderCompanyList();
            } else {
                console.log('Could not bankrupt a company.  No non-bankrupt companies exist.');
            }
        }

        // Add a product to a random non-bankrupt company
        addProductToRandomCompany() {
            var company = this.randomCompanySelector.getNotBankruptCompany();
            if(company) {
                // TODO should we check if a product already exists in company?
                company.addProduct(this.randomCompanySelector.getProduct());
                
                this.businessWorldView.renderCompanyList();
            } else {
                console.log('Could not add a product to a company.  No non-bankrupt companies exist.');
            }
        }

        // Choose a random private company and make it public it
        makeRandomCompanyPublic(){
            var company = this.randomCompanySelector.getPrivateCompany();
            if(company) {
                company.goPublic();
                this.businessWorldView.renderCompanyList();
            } else {
                console.log('Could not add a product to a company.  No private companies exist.');
            }
        }

        mergeTwoRandomPublicCompanies(){
            var companyOne = this.randomCompanySelector.getPublicCompany();
            if(companyOne) {
                var companyTwo = this.randomCompanySelector.getPublicCompany(companyOne.id);
                if(companyTwo) {
                    // Find out which company has the most assets
                    if(companyOne.assets.length > companyTwo.assets.length) {
                        this._mergePublicCompanies(companyOne, companyTwo);
                    } else {
                        this._mergePublicCompanies(companyTwo, companyOne);
                    }
                    this.businessWorldView.renderCompanyList();
                } else {
                    console.log('Unable to merge companies.  Only one public company exist');
                }
            } else {
                console.log('Unable to merge companies.  No public companies exist');
            }
        } 

        _mergePublicCompanies(majorCompany, minorCompany) {
            // Remove both companies
            var majorCompanyIndex = this.companyList.indexOf(majorCompany);
            this.companyList.splice(majorCompanyIndex, 1);
            var minorCompanyIndex = this.companyList.indexOf(minorCompany);
            this.companyList.splice(minorCompanyIndex, 1);
            
            // Create new merged company
            var newCompanyName = majorCompany.name + ' ' + minorCompany.name;
            var mergedAssets = majorCompany.assets;
            if( majorCompany.assets && minorCompany.assets ) {
                mergedAssets = majorCompany.assets.concat(minorCompany.assets);
            }
            this.companyList.push(new Company(newCompanyName, mergedAssets, true));
        }
    }
    return BusinessWorld;
});