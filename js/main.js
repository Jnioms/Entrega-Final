// Classes

class Crypto {
  constructor(name, purchasePrice, quantity) {
    this.name = name;
    this.purchasePrice = purchasePrice;
    this.quantity = quantity;
    this.currentPrice = 0;
  }
}

// Functions

function deleteCrypto(crypto) {
  // Search index of element to delete
  const indexElementToDelete = listOfCryptos.findIndex((cryptoToDelete) => {
    return cryptoToDelete.name === crypto.name;
  });

  // Delete the crypto in list using the index
  listOfCryptos.splice(indexElementToDelete, 1);

  updateLocalStorage();

  showCryptos(listOfCryptos);
}

function editQuantityOfCrypto(crypto, newQuantity) {
  // Search index of element to update
  const indexElementToUpdate = listOfCryptos.findIndex((cryptoToUpdate) => {
    return cryptoToUpdate.name === crypto.name;
  });

  // Update quantity of crypto
  listOfCryptos[indexElementToUpdate].quantity = newQuantity;

  updateLocalStorage();

  showCryptos(listOfCryptos);
}

function editPurchasePriceOfCrypto(crypto, newPurchasePrice) {
  // Search index of element to update
  const indexElementToUpdate = listOfCryptos.findIndex((cryptoToUpdate) => {
    return cryptoToUpdate.name === crypto.name;
  });

  // Update purchase price of crypto
  listOfCryptos[indexElementToUpdate].purchasePrice = newPurchasePrice;

  updateLocalStorage();

  showCryptos(listOfCryptos);
}

function showCryptos(cryptos) {
  // Clean the table
  bodyTable.innerHTML = "";

  cryptos.forEach((crypto) => {
    // Function to get the updated price using Binance public API
    fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${crypto.name}USDT`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Create the row
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.innerHTML = `${crypto.name}`;

        const tdPurchasePrice = document.createElement("td");
        const spanPurchasePrice = document.createElement("span");
        spanPurchasePrice.innerHTML = `$${crypto.purchasePrice}`;
        tdPurchasePrice.append(spanPurchasePrice);

        // Add click event to span to change the input
        spanPurchasePrice.addEventListener("click", () => {
          // Hide purchase price span
          spanPurchasePrice.className = "d-none";

          // Create the input that will update the purchase price
          const inputUpdateOfPurchasePrice = document.createElement("input");
          inputUpdateOfPurchasePrice.value = crypto.purchasePrice;

          // Detect change in the input
          inputUpdateOfPurchasePrice.addEventListener("change", () => {
            // Get new purchase price of crypto through input value
            const newPurchasePrice = inputUpdateOfPurchasePrice.value;

            // Remove the input
            inputUpdateOfPurchasePrice.remove();

            // Show purchase price span
            spanPurchasePrice.className = "d-block";

            // Edit purchase price of crypto
            editPurchasePriceOfCrypto(crypto, newPurchasePrice);
          });

          // Add input to td
          tdPurchasePrice.append(inputUpdateOfPurchasePrice);
        });

        const tdQuantity = document.createElement("td");
        const spanQuantity = document.createElement("span");
        spanQuantity.innerHTML = `${crypto.quantity}`;
        tdQuantity.append(spanQuantity);

        // Add click event to span to change the input
        spanQuantity.addEventListener("click", () => {
          // Hide quantity span
          spanQuantity.className = "d-none";

          // Create the input that will update the quantity
          const inputUpdateOfQuantity = document.createElement("input");
          inputUpdateOfQuantity.value = crypto.quantity;

          // Detect change in the input
          inputUpdateOfQuantity.addEventListener("change", () => {
            // Get new quantity of crypto through input value
            const newQuantity = inputUpdateOfQuantity.value;

            // Remove the input
            inputUpdateOfQuantity.remove();

            // Show quantity span
            spanQuantity.className = "d-block";

            // Edit quantity of crypto
            editQuantityOfCrypto(crypto, newQuantity);
          });

          // Add input to td
          tdQuantity.append(inputUpdateOfQuantity);
        });

        const tdCurrentPrice = document.createElement("td");
        crypto.currentPrice = parseFloat(data.price);
        tdCurrentPrice.innerHTML = `$${crypto.currentPrice}`;

        const tdActions = document.createElement("td");
        const buttonDeleteCrypto = document.createElement("button");
        buttonDeleteCrypto.className = "btn btn-outline-danger";
        buttonDeleteCrypto.innerText = "Delete";

        // Add event to delete button
        buttonDeleteCrypto.addEventListener("click", () => {
          deleteCrypto(crypto);
        });

        tdActions.append(buttonDeleteCrypto);

        // Add the td to the tr
        tr.append(tdName);
        tr.append(tdPurchasePrice);
        tr.append(tdQuantity);
        tr.append(tdCurrentPrice);
        tr.append(tdActions);

        // Add if to check current price and purchase prices and alert on Sell/Hold with row color and notification
        if (crypto.currentPrice > crypto.purchasePrice) {
          tr.className = "table-success";
          Toastify({
            text: "You should SELL!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #5cb85c, #5cb85c)",
            },
          }).showToast();
        } else {
          tr.className = "table-danger";
          Toastify({
            text: "You should HOLD!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #d9534f, #d9534f)",
            },
          }).showToast();
        }
        // Add the tr to the body
        bodyTable.append(tr);
      });
  });
}

function getCryptos() {
  let cryptos = [];

  // Get the elements in Local Storage
  let cryptosLocalStorage = localStorage.getItem("cryptos");

  // If there are elements (doesn't return null) I assign it to the cryptoJSON variable
  if (cryptosLocalStorage !== null) {
    // Parse the literal objetcts in JSON
    const cryptosJSON = JSON.parse(cryptosLocalStorage);

    // For each literal I create a new object for the Crypto class
    for (const cryptoJSON of cryptosJSON) {
      cryptos.push(
        new Crypto(
          cryptoJSON.name,
          cryptoJSON.purchasePrice,
          cryptoJSON.quantity
        )
      );
    }
  }

  return cryptos;
}

function updateLocalStorage() {
  // Write array of objetos to JSON
  const listOfCryptosJSON = JSON.stringify(listOfCryptos);

  // Save the JSON into Local Storage
  localStorage.setItem("cryptos", listOfCryptosJSON);
}

// Run the script

// Get the cryptos
const listOfCryptos = getCryptos();

const formLoadCryptos = document.getElementById("loadCryptos");
const bodyTable = document.getElementById("bodyTable");
const inputName = document.getElementById("nameOfCrypto");
const inputPriceOfPurchaseCrypto = document.getElementById(
  "priceOfPurchaseCrypto"
);
const inputQuantity = document.getElementById("quantityOfCrypto");
const inputSearch = document.getElementById("searchCrypto");

formLoadCryptos.addEventListener("submit", (event) => {
  // Stop flow of event
  event.preventDefault();

  // Get name, purchase price and quantity
  const name = inputName.value;
  const priceOfPurchaseCrypto = inputPriceOfPurchaseCrypto.value;
  const quantity = inputQuantity.value;

  // Clear the inputs
  inputName.value = "";
  inputPriceOfPurchaseCrypto.value = "";
  inputQuantity.value = "";

  // Add crypto to array
  listOfCryptos.push(new Crypto(name, priceOfPurchaseCrypto, quantity));

  updateLocalStorage();

  // Show crypto list
  showCryptos(listOfCryptos);
});

inputSearch.addEventListener("change", () => {
  const cryptoToSearch = inputSearch.value;

  // Filter the cryptos
  const filteredCryptos = listOfCryptos.filter((crypto) => {
    return crypto.name.toLowerCase().includes(cryptoToSearch.toLowerCase());
  });

  showCryptos(filteredCryptos);
});

// Show crypto list
showCryptos(listOfCryptos);
