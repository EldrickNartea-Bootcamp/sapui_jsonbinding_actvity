sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
function (JSONModel, Device) {
    "use strict";

    return {
        /**
         * Provides runtime information for the device the UI5 app is running on as a JSONModel.
         * @returns {sap.ui.model.json.JSONModel} The device model.
         */
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
        
formatMail: function(sEid) {
      var oBundle = this.getView().getModel("i18n").getResourceBundle();
      return mobileLibrary.URLHelper.normalizeEmail(
        sEid + oBundle.getText("domain"),
        oBundle.getText("mailSubject", [sEid]),
        oBundle.getText("mailBody")
      );
    },
    
    formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
      var oCurrency = new sap.ui.model.type.Currency();
      return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
    }
    };

});