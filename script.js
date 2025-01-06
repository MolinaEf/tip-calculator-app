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
    percentage = parseFloat(button.value);
    validateAndCalculate();
}


tipButtons.forEach (button => {
    button.addEventListener("click", function(){
        handleButtonActivation(button)
    });
})

customInput.addEventListener("input", function(){
    percentage = +customInput.value / 100;
    validateAndCalculate();
});

bill.addEventListener("input", function(){
    validateAndCalculate();
});

peopleInput.addEventListener("input", function(){
    validateAndCalculate();
});

resetBtn.addEventListener("click", function(){
    resetInputs();
});

document.addEventListener("click", function (event) {
    if (![...tipButtons].includes(event.target)) {
        tipButtons.forEach(b => b.classList.remove("active"));
        percentage = "";

        tipResult.textContent = "$0.00";
        totalResult.textContent = "$0.00";
    }
});