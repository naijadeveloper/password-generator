// Get needed elements from DOM
const resultEl = document.querySelector("#result");
const lengthEl = document.querySelector("#length");
const uppercaseEl = document.querySelector("#uppercase");
const lowercaseEl = document.querySelector("#lowercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const clipboardEl = document.querySelector("#clipboard");
const choiceText = document.querySelector("#choicetext");
const generateEl = document.querySelector("#generate");



// An object for all generate functions
const funcNames = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

// Two events need handling, 1) for the generate button and 2) for the clipboard
generateEl.addEventListener('click', () => {
  let length = +lengthEl.value;
  let hasLower = lowercaseEl.checked;
  let hasUpper = uppercaseEl.checked;
  let hasNumber = numbersEl.checked;
  let hasSymbol = symbolsEl.checked;
  let choiceTextVal = removeSpaces(choiceText.value);
  let isInput = checkRangeOfValue(choiceTextVal.length);

  resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol, isInput);
  
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
  let textarea = document.createElement('textarea');
  let password = resultEl.innerText;

  if(!password || password == "Password can't be only symbols" || password == "No Checked box") {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  console.log("copied successfully");
});


// Generate password function
function generatePassword(length, lower, upper, number, symbol, input) {
  let choiceTextVal = "";
  let generatedPassword = '';
  let typesCount = lower + upper + number + symbol;
  let typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

  if(lower + upper + number == 0 && +symbol == 1) {
    return "Password can't be only symbols";
  }

  if(typesCount == 0) {
    return "No Checked box";
  }
  
  if(input) {
    choiceTextVal = removeSpaces(choiceText.value);
  }

  let randomVar = 0;
  for(let i = 0; i < length; i+=typesCount) {
    // RandomVar controls whether I get values from typesArr orderly or randomly
    for(let y = 0; y < typesArr.length; y++) {
      let funcIndex;
      if(randomVar == 1) {
        // Get randomly from typesArr
        let randObj = typesArr[Math.floor(Math.random() * typesArr.length)];
        funcIndex = Object.keys(randObj)[0];
        generatedPassword += funcNames[funcIndex](choiceTextVal);
      } else{
        // Get orderly from typesArr.
        funcIndex = Object.keys(typesArr[y])[0];
        generatedPassword += funcNames[funcIndex](choiceTextVal);
      }
    }
    randomVar = 1;
  }// End of for loop

  //fix if password chars is more
  const finalPassword = generatedPassword.slice(0, length);
  console.log(finalPassword, "::", finalPassword.length);

  return finalPassword;
}// End of generatePassword function

// Generator functions - http://www.net-comber.com/charset.html
function getRandomLower(optionalTextValue) {
  if(optionalTextValue) {
    return optionalTextValue[Math.floor(Math.random() * optionalTextValue.length)].toLowerCase();
  }
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(optionalTextValue) {
  if(optionalTextValue) {
    return optionalTextValue[Math.floor(Math.random() * optionalTextValue.length)].toUpperCase();
  }
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%&_-(){}[]=<>/";
  return symbols[Math.floor(Math.random() * symbols.length)]
}

// Get a random letter from input word
function getRandomFromInput() {
  let choiceTextVal = removeSpaces(choiceText.value);
  return choiceTextVal[Math.floor(Math.random() * choiceTextVal.length)];
}

// function to remove spaces from input and another to check the range
function removeSpaces(valueText) {
  return valueText.trim().split("").filter(a => a.trim() !== "").join("");
}

function checkRangeOfValue(value) {
  if(value >= 4 && value <= 20) return true;
  return false;
}