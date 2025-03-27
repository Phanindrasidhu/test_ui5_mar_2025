sap.ui.define(["sap/ui/core/UIComponent"],
    function(UIComponent){
        return UIComponent.extend("ey.sd.sls.Component",{
            metadata:{
                manifest: "json"

            },
            init: function(){
                // call the bass class constructor because it will offer many functionality out of box super constructor
                UIComponent.prototype.init.apply(this);

                // get the object of the Router
                var oRouter = this.getRouter();
                // call the initialize function of Router
                oRouter.initialize();

            },
            // createContent: function(){

            //     var oAppView = new sap.ui.view({
            //         id: "idAppView",
            //         viewName: "ey.sd.sls.view.App",
            //         type: "XML"
            //     });

            //     //step 1 obtain the object of App Container control

            //     var oAppCon = oAppView.byId("idAppCon");

            //     //step 2 create object for our newly created views

            //     var oView1 = new sap.ui.view({
            //         id: "idView1",
            //         viewName: "ey.sd.sls.view.View1",
            //         type: "XML"
            //     });

            //     var oView2 = new sap.ui.view({
            //         id: "idView2",
            //         viewName: "ey.sd.sls.view.View2",
            //         type: "XML"
            //     });

            //     var oEmpty = new sap.ui.view({
            //         id: "idEmpty",
            //         viewName: "ey.sd.sls.view.Empty",
            //         type: "XML"
            //     });

            //     // step 3 add object to the container

            //     oAppCon.addMasterPage(oView1);
            //     oAppCon.addDetailPage(oEmpty).addDetailPage(oView2);

            //     return oAppView;
            // },
            destroy: function(){}
        });
    });