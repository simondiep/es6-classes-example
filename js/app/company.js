define(function () {
    'use strict';

    // Company state mapped to css style name
    const CompanyState = {
        PRIVATE : '',
        PUBLIC : 'public',
        BANKRUPT : 'bankrupt'
    };

    /**
    *   Model Object
    */
    class Company {
    
        /**
        *   @param {string} name
        *   @param {Array<string>} assets (optional)
        *   @param {boolean} isPublic (optional)
        */
        constructor(name, assets, isPublic) {
            this.id = this._generateUUID();
            this.name = name;
            this.state = isPublic? CompanyState.PUBLIC : CompanyState.PRIVATE;
            this.assets = assets || [];
        }
        
        addProduct(product) {
            this.assets.push(product);
        }
        
        goBankrupt() {
            this.state = CompanyState.BANKRUPT;
        }
        
        goPublic() {
            this.state = CompanyState.PUBLIC;
        }
        
        isBankrupt() {
            return this.state === CompanyState.BANKRUPT;
        }
        
        isPublic() {
            return this.state === CompanyState.PUBLIC;
        }
        
        isPrivate() {
            return this.state === CompanyState.PRIVATE;
        }
        
        // Grabbed from http://stackoverflow.com/a/8809472/1222197
        _generateUUID(){
            var d = new Date().getTime();
            if(typeof window !== 'undefined' && window.performance && typeof window.performance.now === "function"){
                d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        } 
    }

    return Company;
});
