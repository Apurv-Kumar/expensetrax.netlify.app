// init value of expense at 0.
let totalExpense = 0;
// array to store all objects of individual expenses.
var expenses = [];

// get the heading element 
const totalHeading = document.querySelector("#totalHeading");
// get the reference to inputDesc element.
const expDesc = document.querySelector("#inputDesc");
// get value from inputAmount.
const btn_val = document.querySelector("#inputAmount");
// get the reference to the expenseTable.
const expenseTable = document.querySelector("#expenseTable");

// set the heading element to totalExpense.
totalHeading.textContent = totalExpense;

// set the options required for date time object format here
const dateTimeOptions = {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',
    minute: 'numeric', hour12: "false"
};

// Function to increment the total.
function addExpenseToTotal() {
    // object to store a single expense.
    let singleExpense = { expenseDesc: "", expenseAmount: 0 };

    //read value from inputAmount.
    const textAmount = btn_val.value;

    // convert textAmount to number.
    const numAmount = parseInt(textAmount, 10);

    // read value from inputDesc.
    const textDesc = expDesc.value;

    // add value to total expense.
    totalExpense = totalExpense + numAmount;

    // push expense amount , desc and dateTime to singleExpense object.
    singleExpense['expenseDesc'] = textDesc;
    singleExpense['expenseAmount'] = numAmount;
    singleExpense["expenseDateTime"] = new Date();

    // set the heading element whenever the function is called.
    renderTotalExpense(totalExpense);

    // pushing individual expenses into the expenses array.
    expenses.push(singleExpense);
    // // creating HTML of all expenses
    renderList(expenses);
    // console.clear();
    // console.table(expenses);
};
// get the btnAddExpense Element.
const element = document.querySelector("#btnAddExpense");
// onButtonClick call addExpenseToTotal function.
element.addEventListener("click", addExpenseToTotal, false);

//Controller Functions

// function to get current date in required format 
function getDateString(dateString, locale, formatOptions) {
    return dateString.toLocaleDateString(locale, formatOptions);
};

// function to delete an item from expenses array.
function deleteExpenseItem(dateValue) {
    // const filteredExpenses = [];
    // for (let i = 0; i < expenses.length; i++) {
    //     if (expenses[i].expenseDateTime.valueOf() !== dateValue) {
    //         filteredExpenses.push(expenses[i])
    //     }

    // };
    const filteredExpenses = expenses
        .filter((expense) => expense.expenseDateTime.valueOf() !== dateValue);
    expenses = filteredExpenses;
    let initialValue = 0
    const newTotalExpense = expenses.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.expenseAmount
    }, initialValue);
    console.log(newTotalExpense);
    renderTotalExpense(newTotalExpense);
    renderList(filteredExpenses);
};

// view layer
function renderList(expensesArray) {
    const expenseHTML = expensesArray.map((item) => createListItem(item));
    const joinedExpenseHTML = expenseHTML.join("");
    expenseTable.innerHTML = joinedExpenseHTML;
}

function renderTotalExpense(ExpenseTotal){
    const headingText = `Total Expenses : ${ExpenseTotal}`
    totalHeading.textContent = headingText;
}

// function to create list items
function createListItem({ expenseDesc, expenseAmount, expenseDateTime }) {
    return `
        <li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
            ${expenseDesc}
            <small class="text-muted">${getDateString(expenseDateTime, "en-US", dateTimeOptions)}</small >
        </div >
    <div>
        <span class="px-5">
            ₹${expenseAmount}
        </span>
        <button 
            type="button" 
            class="btn btn-outline-danger btn-sm"
            onclick="deleteExpenseItem(${expenseDateTime.valueOf()})"
            >
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
        </li >
    `
};
