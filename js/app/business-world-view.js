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

        clearCompanyNameInputValue() {
            $('#nameInput').val('');
        }
        
        getCompanyNameInputValue() {
            return $('#nameInput').val();
        }
        
        // Take the current company list and update the DOM
        renderCompanyList(companyList) {
            // Remove all rendered companies
            var worldDiv = document.getElementById("world");
            while (worldDiv.firstChild) {
                worldDiv.removeChild(worldDiv.firstChild);
            }
            companyList.forEach(function(company) {
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
    
        setAddProductClickHandler(handler) {
            $("#addProductBtn").click(handler); 
        }
        setBankruptCompanyClickHandler(handler) {
            $("#bankruptBtn").click(handler); 
        }
        setCreateCompanyClickHandler(handler) {
            $("#createCompanyBtn").click(handler); 
        }
        setEncourageMergersClickHandler(handler) {
            $("#encourageMergersBtn").click(handler); 
        }
        setFloatCompanyClickHandler(handler) {
            $("#floatRandomBtn").click(handler); 
        }
    }

    return BusinessWorldView;
});