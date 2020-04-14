//BUDGET CONTROLLER
var budgetController = (function() {
  
})();

//UI CONTROLLER
var UIController = (function(){
   


})();


//GLOBAL APP CONTROLLER
var appController = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function(){
        //1.Get the field input data

       //2.Add the item to the budget Controller

       //3.Add the item to the UI
       //4.calculate the budget
       //5.display the budget
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem); 
    document.addEventListener('keypress', function(event){
         if(event.keyCode === 13 || event.which === 13){
             ctrlAddItem();
           }
         });

})(budgetController, UIController);