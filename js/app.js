//BUDGET CONTROLLER
var budgetController = (function() {
    var Expense = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
    };
    var Income = function(id, description, value){
       this.id = id;
       this.description = description;
       this.value = value;
    };
    var data = {
         allItems: {
             exp: [],
             inc: []
         },
         totals: {
           exp: 0,
           inc: 0
         }
    };
    return {
      addItem: function(type, des, val){
        var newItem, ID;
        //ID = last ID + 1 to give the unique id which will not be repeated
        //Create new ID
        if(data.allItems[type].length > 0){
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }
        else{
          ID = 0;
        }
       
        //Create new item based on 'inc' or 'exp'
        if(type === 'exp'){
          newItem = new Expense(ID, des, val);
        }
        else if(type === 'inc'){
          newItem = new Income(ID, des, val);
        }
        //push it into our data structure
        data.allItems[type].push(newItem);
        //Return new Element
        return newItem;
      },
      testing: function(){
         console.log(data);
      }
    };
})();

//UI CONTROLLER
var UIController = (function(){
     var DOMstrings = {
           inputType: '.add__type',
           inputDescription: '.add__description',
           inputValue: '.add__value',
           inputBtn: '.add__btn',
           incomeContainer: '.income__list',
           expenseContainer: '.expenses__list'
     };
    return {
      getInput: function(){
        return {
          type: document.querySelector(DOMstrings.inputType).value,
          description: document.querySelector(DOMstrings.inputDescription).value,
           value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
         };         
      },
      addListItem: function(obj,type){
        var html, newHtml, element;
        //Create HTML string with placeholder text
        if(type === 'inc'){
          element = DOMstrings.incomeContainer;
          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        else if(type === 'exp'){
          element = DOMstrings.expenseContainer;
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        //Replace the placeholder text with some actual data
        newHtml = html.replace('%id%',obj.id);
        newHtml = newHtml.replace('%description%',obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        //Insert the HTML into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },
      clearFields: function(){
        document.querySelector(DOMstrings.inputDescription).value = '';
        document.querySelector(DOMstrings.inputValue).value = '';
        /*
         var fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
         var fieldsArr = Array.prototype.slice.call(fields);
         fieldsArr.forEach((current, index, array) => current.value = '';)
        */
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

    var setupEventListeners = function(){
      var DOM = UICtrl.getDOMstrings();
      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); 
      document.addEventListener('keypress', function(event){
         if(event.keyCode === 13 || event.which === 13){
             ctrlAddItem();
           }
         });
    };
    var updateBudget = function(){
      //1.calculate the budget
       //2.display the budget
       //3.Display the budget in UI
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        //1.Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0){
             //2.Add the item to the budget Controller
              newItem = budgetCtrl.addItem(input.type, input.description, input.value);
             //3.Add the item to the UI
              UICtrl.addListItem(newItem, input.type);
             //4.Clear the fields
              UICtrl.clearFields();
             //5.Calculate and update budget
               updateBudget();
              }
      
    };
    return {
      init: function(){
           setupEventListeners();
           }
         };

})(budgetController, UIController);

appController.init();