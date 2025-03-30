const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const convertedAmountBox = document.querySelector(".converted-amount");
const swapIcon = document.querySelector(".currency-row i");

// Country and currency mapping
const countryList = {
    USD: "US",
    INR: "IN",
    EUR: "FR",
    GBP: "GB",
    JPY: "JP",
    CAD: "CA",
    AUD: "AU",
    CNY: "CN",
    BRL: "BR",
    RUB: "RU",
    SGD: "SG"
};

// Populate currency dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "fromCurrency" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "toCurrency" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update exchange rate and converted amount
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount-box input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = (amtVal * rate).toFixed(2);
    
    convertedAmountBox.innerText = `${finalAmount} ${toCurr.value}`;
};

// Update flag when currency is changed
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Swap currencies and update exchange rate
swapIcon.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
});

// Event listeners
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
