define([
  'jquery'
],

function ($) {
    'use strict';

    // A placeholder company represented in HTML
    const COMPANY_HTML_TEMPLATE = '<div class="company companyStatePlaceholder"><span class="name">companyNamePlaceholder</span><ul class="assets">assetListPlaceholder</ul></div>';
    
    /**
    *   Handles all of the BusinessWorld view functionality
    */
    class BusinessWorldView {
    
        constructor(businessWorld) {
            this.companyList = businessWorld.companyList;
        
            // Hook up button click handlers
            $("#createCompanyBtn").click(function() {businessWorld.createCompany(); }); 
            $("#bankruptBtn").click(function() {businessWorld.bankruptRandomCompany(); }); 
            $("#addProductBtn").click(function() {businessWorld.addProductToRandomCompany(); });
            $("#floatRandomBtn").click(function() {businessWorld.makeRandomCompanyPublic(); });
            $("#encourageMergersBtn").click(function() {businessWorld.mergeTwoRandomPublicCompanies(); });
        }

        clearCompanyNameInputValue() {
            $('#nameInput').val('');
        }
        
        getCompanyNameInputValue() {
            return $('#nameInput').val();
        }
        
        // Take the current company list and update the DOM
        renderCompanyList() {
            // Remove all rendered companies
            var worldDiv = document.getElementById("world");
            while (worldDiv.firstChild) {
                worldDiv.removeChild(worldDiv.firstChild);
            }
            this.companyList.forEach(function(company) {
                var companyAsHtml = COMPANY_HTML_TEMPLATE;
                companyAsHtml = companyAsHtml.replace('companyNamePlaceholder', company.name);
                if(company.state) {
                    companyAsHtml = companyAsHtml.replace('companyStatePlaceholder', company.state);
                }
                var assetsAsHtml = '';
                if(company.assets) {
                    company.assets.forEach(function(asset) {
                        assetsAsHtml += '<li>'+asset+'</li>';
                    });
                }
                companyAsHtml = companyAsHtml.replace('assetListPlaceholder', assetsAsHtml);
                $(companyAsHtml).appendTo('#world');
            });
        }
    
    }

    return BusinessWorldView;
});