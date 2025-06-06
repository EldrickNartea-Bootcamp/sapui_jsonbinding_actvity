sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/type/Currency"
], (Controller, JSONModel, Currency) => {
    "use strict";

    return Controller.extend("zbtp.sapuijsonbindingactvity.controller.View1", {
        onInit() {
            var oData = {
                EID: "eldrick.nartea",
                Enabled: true,
                Address: {
                  Street: "Teka St",
                  City: "Makati",
                  Zip: "1203",
                  Country: "Philippines"
                },
                SalesAmount: 25000,
                CurrencyCode: "PHP"
            };

            let oModel = new JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel, "myDetails");
        },

        onSendEmail: function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var mailBody = oBundle.getText("mailBody");
            var mailSubject = oBundle.getText("mailSubject");    
            var to = this.getView().getModel("myDetails").getProperty("/EID");
            var subject = encodeURIComponent(mailSubject);
            var body = encodeURIComponent(mailBody);
            var mailtoLink = `mailto:${to + "@accenture.com"}?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
        },

		formatStockValue(fUnitPrice, iStockLevel, sCurrCode) {
			const oCurrency = new Currency();

			return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
		},

		onItemSelected(oEvent) {
			const oSelectedItem = oEvent.getSource();
			const oContext = oSelectedItem.getBindingContext("products");
			const sPath = oContext.getPath();
			const oProductDetailPanel = this.byId("productDetailsPanel");
			oProductDetailPanel.bindElement({ path: sPath, model: "products" });
		}

        
    });
});