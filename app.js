// We need event handler  -- It is controller module
// Get input values --UI  Module
//Add the item to our data structure -- Data Module
//Add the new item to the UI --- UI  Module
//Calculate the budget  -- Data Module
//Update the UI --UI  Module

//Budget Controller
var budgetController = (function () {  //IIFE is an anaymus function that we will use rn
    //Funtion Construction for Expense and Income
    var Expense = function (id, description, value) { // Keep private in here
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function (id, description, value) {
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
        addItem: function (type, des, val) {
            var newItem;
            //create new ID
            if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length-1].id +1;
            }else{
                ID=0;
            }
            //CREATE NEW ITEM BASED ON TYPE
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);

            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            //Pushed on data structure and return the element
            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function(){
            console.log("Budget Test");
        }
    };

})();

//UI COntroller
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescriptor: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,// It will be either inc or exp since it is a checkbox
                description: document.querySelector(DOMstrings.inputDescriptor).value,
                value: document.querySelector(DOMstrings.inputValue).value

            };
            // var type = document.querySelector('.add__type').value; // It will be either inc or exp since it is a checkbox
            // var description = document.querySelector('.add__description').value; 
            // var value = document.querySelector('.add__value').value; 
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

//Global App Controller
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }

        });

    }
    var ctrlAddItem = function () {
        var input,newItem;
        //1. Get the field input data
        input = UICtrl.getInput();
        console.log(input);

        //2. Add item to the budget controller
        newItem = budgetController.addItem(input.type,input.description,input.value);
        //3. Add the new item to the UI

        //4. Calculate the budget

        //5. Display the budget

    }

    return {
        init: function () {
            console.log('Application has started');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();