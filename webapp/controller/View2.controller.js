sap.ui.define(
    ["ey/sd/sls/controller/BaseController",
        "sap/m/MessageBox",
        "sap/m/MessageToast", 
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
    ],
    function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator ){
        return BaseController.extend("ey.sd.sls.controller.View2",{
            oRouter: null,
            onInit: function(){
                //Step 1: get router object
                this.oRouter = this.getOwnerComponent().getRouter();
                //Step 2: register this route
                //We attach the RMH event to a new herculis function, also pass controller object
                //to that function
                this.oRouter.getRoute("spiderman").attachMatched(this.herculis, this);
            },
            herculis : function(oEvent){
                //Step 1: extract the id
                var sIndex = oEvent.getParameter("arguments").fruitId;
                //Step 2: Rebuild the path
                var sPath = "/fruits/" + sIndex;
                //Step 3: get the current view object
                var oView2 = this.getView();
                //Step 4: Bind the element
                oView2.bindElement(sPath);

                //debugger;
            },
            oSupplierPopup:null,
            onFilter: function(){
                // Fragment is a standard SAP UI5 API which has load function to load fragment we will receive the object of fragment and load it through a promise
                // we need to create a local variable which is accessible this async function
                var that = this;
                if(!this.oSupplierPopup){
                    Fragment.load({
                        id:"supplier",
                        fragmentName:"ey.sd.sls.fragments.popup",
                        type:"XML",
                        controller: this
                    })
                    // then is a keyword to indicate promise was fullfiled - fragment loaded
                    // here we have a promise function which gives the object created
                    .then(function(oFragment){
                        // inside this promise we cannot access global variable "this"
                        // we  must create a copy of this variable outside the function
                        // that is the object of class- controller
                        that.oSupplierPopup = oFragment;
                        // check sdk for selectdialog properties
                        that.oSupplierPopup.setTitle("Select Supplier(s)");
                        //Allow access of the model to the fragment
                        that.getView().addDependent(that.oSupplierPopup);
                        // Binding with items (sytax 4)
                        that.oSupplierPopup.bindAggregation("items",{
                            path:'/supplier',
                            template: new sap.m.StandardListItem({
                                icon: 'sap-icon://supplier',
                                title: '{name}',
                                description: '{sinceWhen}'
                            })
                        });
                        that.oSupplierPopup.open();
                        that.oSupplierPopup.setMultiSelect(true);
                    });
                }else{
                    this.oSupplierPopup.open();
                }
            },
            oCityPopup: null, 
            oField: null,
            onF4Help: function(oEvent){
                // when user click f4 on the field(city in table), we will capture the object of that cell afield in a global variable
                this.oField = oEvent.getSource();
                var that = this;
                if(!this.oCityPopup){
                    Fragment.load({
                        id:"city",
                        fragmentName:"ey.sd.sls.fragments.popup",
                        type:"XML",
                        controller: this
                    })
                    // then is a keyword to indicate promise was fullfiled - fragment loaded
                    // here we have a promise function which gives the object created
                    .then(function(oFragment){
                        // inside this promise we cannot access global variable "this"
                        // we  must create a copy of this variable outside the function
                        // that is the object of class- controller
                        that.oCityPopup = oFragment;
                        // check sdk for selectdialog properties
                        that.oCityPopup.setTitle("Select Supplier(s)");
                        //Allow access of the model to the fragment
                        that.getView().addDependent(that.oCityPopup);
                        // Binding with items (sytax 4)
                        that.oCityPopup.bindAggregation("items",{
                            path:'/cities',
                            template: new sap.m.StandardListItem({
                                icon: 'sap-icon://home',
                                title: '{name}',
                                description: '{state}'
                            })
                        });
                        that.oCityPopup.open();
                    });
                }else{
                    this.oCityPopup.open();
                }
            },
            onConfirmPopup: function(oEvent){
                //debugger;
                //MessageToast.show("Yes this is it");

                // get the Id of the poopup with which user interacting
                var sId = oEvent.getSource().getId();
                // checking if the id contains the city
                if(sId.indexOf("city") != -1){
                // step 1 get the selected value by useer
                   var sVal  = oEvent.getParameter("selectedItem").getTitle();
               // step 2 set the value to out input field
                  this.oField.setValue(sVal);
                }else{
                    // logic for suppliers
                    // here we need to get the selecteditems from supplier after applyig the selectmultiple logic
                    var aSelectedItems = oEvent.getParameter("selectedItems");
                    // loop at these items and constuct a array filter
                    var aFilter = [];
                    for (let i = 0; i < aSelectedItems.length; i++) {
                        const element = aSelectedItems[i];
                        var sText= element.getTitle();
                        aFilter.push(new Filter("name",FilterOperator.EQ, sText));                        
                    }
                    // creating filters
                    var oFilter = new Filter({
                        filters: aFilter,
                        and:false
                    });
                    //get the tbale object
                    var oTable = this.getView().byId("idSupplierTab");
                    // inject the filter into the table 
                    oTable.getBinding("items").filter(oFilter);
                }
            },
            onBack: function(){
                //chaining in JS with same thing done to use parent to nav to view1
                this.getView().getParent().to("idView1");
            },
            onSave: function(){
                //alert("do you want to save");
                MessageBox.confirm("Do you want to save?",{
                    onClose: function(status){
                        if(status === "OK"){
                            MessageToast.show("The Order has been created 👌");
                        }else{
                            MessageBox.error("OOPS!! you broke my heart 💔");
                        }
                    }
                });
            },
            onSupplier: function(oEvent){
               // MessageBox.confirm("This functionality is under construction");
               // get the selected item done by user
               var oListItem = oEvent.getParameter("listItem");
               //Extract the address of the same
               var sPath = oListItem.getBindingContextPath();
               // extract the Id
               var sIndex = sPath.split("/")[sPath.split("/").length -1];

               this.oRouter.navTo("supplier",{
                suppId: sIndex
               });
            }
        });
});