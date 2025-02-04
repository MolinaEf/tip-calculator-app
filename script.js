const bill = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-percentage");
const peopleInput = document.getElementById("people-input");
const tipResult = document.querySelector(".tip-result");
const totalResult = document.querySelector(".total-result");
const customInput = document.getElementById("custom-tip");
const resetBtn = document.getElementById("reset-btn");
let isValid = true;
let percentage = ""

function validateInputs(){

    let numberInputs  = document.querySelectorAll(".input");
    isValid = true

    numberInputs.forEach(input => {
        let errorId = input.getAttribute("data-error");
        let error = document.getElementById(errorId);
        let value = parseFloat(input.value);

        if (isNaN(value) || input.value.trim() === "" ){
        isValid = false;
        } else if (value === 0){
        error.classList.remove("hide");
        input.classList.add("error");
        isValid = false
        } else if (value > 0){
        error.classList.add("hide");
        input.style.border = "none";
        input.classList.remove("error");
        }
    });
    return isValid;
}

function resetInputs(){
    bill.value = "";
    peopleInput.value = "";
    customInput.value = "";
    tipResult.textContent = "$0.00";
    totalResult.textContent = "$0.00";
    percentage = "";
}

function calculateInput(percentage){

    let billTotal = parseFloat(bill.value);
    let peopleTotal = parseFloat(peopleInput.value);
    let tipTotal = billTotal * percentage;
    let tipPerPerson = tipTotal / peopleTotal; 
    let totalPerPerson = billTotal / peopleTotal + tipPerPerson;

    tipResult.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalResult.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function validateAndCalculate(){
    isValid = validateInputs();
    if (isValid && percentage !== "" && !isNaN(percentage)) {
        calculateInput(percentage);
    }
}

function handleButtonActivation(button) {
    tipButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    customInput.value = "";
    percentage = parseFloat(button.value);
    validateAndCalculate();
}

function checkFields(){
    // Check if any field (bill, peopleInput, customInput, or percentage) is filled or has a valid value
    if ((bill.value || peopleInput.value || customInput.value || percentage !== "") && 
        !(bill.value === "" && peopleInput.value === "" && customInput.value === "")) {
        resetBtn.disabled = false;  // Enable reset button
    } else {
        resetBtn.disabled = true;   // Disable reset button
    }
}

tipButtons.forEach (button => {
    button.addEventListener("click", function(){
        handleButtonActivation(button)
        checkFields();
    });
})

customInput.addEventListener("input", function(){
    tipButtons.forEach(b => b.classList.remove("active"));
    percentage = +customInput.value / 100;
    checkFields();
    validateAndCalculate();
});

customInput.addEventListener("click", function(event){
    tipButtons.forEach(b => b.classList.remove("active"));
    if (event.target.value === "") {
        percentage = "";

        tipResult.textContent = "$0.00";
        totalResult.textContent = "$0.00";
}
})

bill.addEventListener("input", function(){
    checkFields();
    validateAndCalculate();
});

peopleInput.addEventListener("input", function(){
    checkFields();
    validateAndCalculate();
});

resetBtn.addEventListener("click", function(){
    resetInputs();
    resetBtn.disabled = true;
    console.log("resetBtn clicked");
});

document.addEventListener("click", function (event) {
    if (![...tipButtons].includes(event.target) && event.target !== customInput && event.target !== bill && event.target !== peopleInput ) {
        if (customInput.value === "") {
        tipButtons.forEach(b => b.classList.remove("active"));
        percentage = "";

        tipResult.textContent = "$0.00";
        totalResult.textContent = "$0.00";
    }
}
});

resetBtn.disabled = true;