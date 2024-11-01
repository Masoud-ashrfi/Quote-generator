const quote = document.querySelector(".quote");
const writer = document.querySelector(".Writer");
const newQuoteBtn = document.querySelector(".new-quote");
const inputCatagory = document.querySelector(".input-field");
const inputBtn = document.querySelector(".input-button");
const favCatagory = document.querySelector(".favorite-category");
const buttons = document.querySelector(".buttons");
const errorMessage = document.querySelector(".error-message");

const api_key = "yxGwRyJr+re95KN/988u5g==uoMbgD9PTLZZv6Wb";
// const category = "computers";
const api_url = "https://api.api-ninjas.com/v1/quotes?category="; // Define the API URL

let finalCategory;
//Getting a Quote in every call
async function getQuote(category) {
  try {
    finalCategory = category;

    // Hide the error message and quote-related elements initially
    quote.style.display = "none";
    writer.style.display = "none";
    buttons.style.display = "none";

    //Fetching data
    const response = await fetch(`${api_url}${category}`, {
      method: "GET",
      headers: {
        "X-Api-Key": api_key,
        "Content-Type": "application/json",
      },
    });

    //Throw an error
    if (!response.ok) {
      throw new Error("Invalid category name");
    }

    const data = await response.json();
    console.log(data);

    // Check if the data array is empty (no quotes found for category)
    if (data.length === 0) {
      throw new Error(`No quotes found for category "${category}".`);
    }

    //Updating the UI with the Quote
    inputCatagory.blur();
    quote.innerHTML = data[0].quote;
    writer.textContent = data[0].author;
    inputCatagory.value = "";

    // Show the quote and related UI elements
    errorMessage.style.display = "none";
    quote.style.display = "block";
    writer.style.display = "block";
    buttons.style.display = "flex";
  } catch (error) {
    inputCatagory.value = "";
    inputCatagory.blur();
    quote.style.display = "none";
    writer.style.display = "none";
    buttons.style.display = "none";
    errorMessage.style.display = "block";
    errorMessage.textContent = error.message;
  }
}

//Tweeting the Quote in X
function tweet() {
  window.open(
    `https://twitter.com/intent/tweet?text=` + quote.innerHTML,
    "Tweet Window",
    "width=600, height=300"
  );
}

//Handling the input catagory
inputBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getQuote(inputCatagory.value);

    favCatagory.style.display = "flex";
    favCatagory.style.justifyContent = "center";
    favCatagory.style.alignItems = "center";
    favCatagory.style.gap = "10px";
    document.querySelector(".favCatagoryText").style.marginTop = "10px";
  }
});

newQuoteBtn.addEventListener("click", () => {
  getQuote(finalCategory);
});
