//BUDGET CONTROLLER
var budgetController = (function() {
  
})();

//UI CONTROLLER
var UIController = (function(){
     var DOMstrings = {
           inputType: '.add__type',
           inputDescription: '.add__description',
           inputValue: '.add__value',
           inputBtn: '.add__btn'
     }
    return {
      getInput: function(){
        return {
          type: document.querySelector(DOMstrings.inputType).value,
          description: document.querySelector(DOMstrings.inputDescription).value,
           value: document.querySelector(DOMstrings.inputValue).value
         };         
      },
      //Making DOMStrings object from one module(controller) to another
      //making it public by creating function inside return { }
      getDOMstrings: function(){
          return DOMstrings;  
      }
    };   
})();


//GLOBAL APP CONTROLLER
var appController = (function(budgetCtrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();
    var ctrlAddItem = function(){
        //1.Get the field input data
         var input = UICtrl.getInput();
         console.log(input);
       //2.Add the item to the budget Controller

       //3.Add the item to the UI
       //4.calculate the budget
       //5.display the budget
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); 
    document.addEventListener('keypress', function(event){
         if(event.keyCode === 13 || event.which === 13){
             ctrlAddItem();
           }
         });

})(budgetController, UIController);