define([
    'company',
    'random-company-selector'
],

function (Company, RandomCompanySelector) {
'use strict';

    /**
    *   Controller
    */
    class BusinessWorld {

        constructor(businessWorldView) {
            this.companyList = [];
            this.businessWorldView = businessWorldView;
            this.randomCompanySelector = new RandomCompanySelector(this.companyList);
            this._addButtonClickHandlers(this.businessWorldView);
        }
        
        createCompany() {
            let newCompanyName = this.businessWorldView.getCompanyNameInputValue();
            if(newCompanyName) {
                this.companyList.push(new Company(newCompanyName));
                this.businessWorldView.renderCompanyList(this.companyList);
                // Clear input
                this.businessWorldView.clearCompanyNameInputValue();
            } else {
                // POTENTIAL-FEATURE Integrate Toast messaging to display these messages
                console.log('Could not create a company.  Company name required.');
            }
        }

        // Choose a random non-bankrupt company and bankrupt it
        bankruptRandomCompany() {
            let company = this.randomCompanySelector.getNotBankruptCompany();
            if(company) {
                company.goBankrupt();
                this.businessWorldView.renderCompanyList(this.companyList);
            } else {
                console.log('Could not bankrupt a company.  No non-bankrupt companies exist.');
            }
        }

        // Add a product to a random non-bankrupt company
        addProductToRandomCompany() {
            let company = this.randomCompanySelector.getNotBankruptCompany();
            if(company) {
                // TODO should we check if a product already exists in company?
                company.addProduct(this.randomCompanySelector.getProduct());
                
                this.businessWorldView.renderCompanyList(this.companyList);
            } else {
                console.log('Could not add a product to a company.  No non-bankrupt companies exist.');
            }
        }

        // Choose a random private company and make it public it
        makeRandomCompanyPublic(){
            let company = this.randomCompanySelector.getPrivateCompany();
            if(company) {
                company.goPublic();
                this.businessWorldView.renderCompanyList(this.companyList);
            } else {
                console.log('Could not add a product to a company.  No private companies exist.');
            }
        }

        mergeTwoRandomPublicCompanies(){
            let companyOne = this.randomCompanySelector.getPublicCompany();
            if(companyOne) {
                let companyTwo = this.randomCompanySelector.getPublicCompany(companyOne.id);
                if(companyTwo) {
                    // Find out which company has the most assets
                    if(companyOne.assets.length > companyTwo.assets.length) {
                        this._mergePublicCompanies(companyOne, companyTwo);
                    } else {
                        this._mergePublicCompanies(companyTwo, companyOne);
                    }
                    this.businessWorldView.renderCompanyList(this.companyList);
                } else {
                    console.log('Unable to merge companies.  Only one public company exist');
                }
            } else {
                console.log('Unable to merge companies.  No public companies exist');
            }
        } 

        _addButtonClickHandlers(businessWorldView) {
            businessWorldView.setAddProductClickHandler(this.addProductToRandomCompany.bind(this)); 
            businessWorldView.setBankruptCompanyClickHandler(this.bankruptRandomCompany.bind(this)); 
            businessWorldView.setCreateCompanyClickHandler(this.createCompany.bind(this)); 
            businessWorldView.setEncourageMergersClickHandler(this.mergeTwoRandomPublicCompanies.bind(this)); 
            businessWorldView.setFloatCompanyClickHandler(this.makeRandomCompanyPublic.bind(this));
        }
        
        _mergePublicCompanies(majorCompany, minorCompany) {
            // Remove both companies
            let majorCompanyIndex = this.companyList.indexOf(majorCompany);
            this.companyList.splice(majorCompanyIndex, 1);
            let minorCompanyIndex = this.companyList.indexOf(minorCompany);
            this.companyList.splice(minorCompanyIndex, 1);
            
            // Create new merged company
            let newCompanyName = majorCompany.name + ' ' + minorCompany.name;
            let mergedAssets = majorCompany.assets;
            if( majorCompany.assets && minorCompany.assets ) {
                mergedAssets = majorCompany.assets.concat(minorCompany.assets);
            }
            this.companyList.push(new Company(newCompanyName, mergedAssets, true));
        }
    }
    return BusinessWorld;
});