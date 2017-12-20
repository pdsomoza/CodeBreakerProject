const answer = document.getElementById('answer');
const attempt = document.getElementById('attempt');
const results = document.getElementById('results'); 
const lenCode = 4;

guess();

function guess() {
    const input = document.getElementById('user-guess');

    if(answer.value == '' || attempt.value == '') setHiddenFields();
    if(!validateInput(input.value)) return;
    
    attempt.value++;

    if (getResults(input.value)) {
        showAnswer(true);
        return setMessage("You Win! :)");    
    }    
    if(attempt.value >= 3) {
        showAnswer(false);
        return setMessage("You Lose! :(");
    }    
    return setMessage("Incorrect, try again.");
}

function setHiddenFields() {
    attempt.value = 0;
    answer.value =  Math.floor(Math.random() * (10000));
    while (answer.value.toString().length < lenCode)
        answer.value = `0${answer.value}`;
}

function setMessage(message) {
    const input = document.getElementById('message');
    input.innerHTML = message;
}

function validateInput(input) {
    let isValid = false;
    if(input.length === lenCode)
        isValid = true;
    else
        setMessage("Guesses must be exactly 4 characters long.");    

    return isValid;
}

function getResults(input) {
    let guess = 0;
    let html = results.innerHTML;
    html += `<div class="row"><span class="col-md-6">`;
    html += `${input}</span><div class="col-md-6">`;
    
    for (let ii=0;ii < lenCode;ii++) {
        let icon = "remove";
        let char = input.charAt(ii);
        
        if (char == answer.value.charAt(ii)){
            icon = "ok";
            guess++;    
        } 
        else if(answer.value.indexOf(char) > -1) icon = "transfer";

        html += `<span class="glyphicon glyphicon-${icon}"></span>`;
    }      

    results.innerHTML = html += `</div></div>`; 
    return guess === lenCode;
}

function showAnswer(won) {
    const code = document.getElementById('code');
    code.innerHTML = `<strong>${answer.value}</strong>`;
    if(won)
        code.classList.add("success");
    else    
        code.classList.add("failure");

    showReplay();
}

function showReplay() {
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}