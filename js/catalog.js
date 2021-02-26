/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.

const selectElement = document.getElementById('items');

function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  

  // for (let i in Product.allProducts) {

  for (let index = 0; index < Product.allProducts.length; index++) {

    const productInstance = Product.allProducts[index];
    
    const optionElem = document.createElement('option');
    optionElem.value = productInstance.name;
    optionElem.textContent = productInstance.name;

    selectElement.appendChild(optionElem);

    // console.log(optionElem);

  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {

  const opt = selectElement.options[selectElement.selectedIndex];
  const quantity = document.getElementById('quantity').value;
  
  for (let i = 0; i < Product.allProducts.length; i++){
      if (Product.allProducts[i].name === opt.value) {
        cart.addItem(Product.allProducts[i].name, quantity)
      }
  }
  // DONE: suss out the item picked from the select list
  // DONE: get the quantity
  // DONE: using those, add one item to the Cart
}

// DONE: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  const itemCountElem = document.getElementById('itemCount');
  const numberOfItemsInCart = cart.items.length
  itemCountElem.textContent = '(' + numberOfItemsInCart + ')';
}

// DONE: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // DONE: Get the item and quantity from the form
  // DONE: Add a new element to the cartContents div with that information
  const previewElem = document.getElementById('cartContents');
  const lastCartItem = cart.items[cart.items.length-1];
  const cartItemElem = document.createElement('p');
  cartItemElem.textContent = lastCartItem.product + " : " + lastCartItem.quantity;
  previewElem.appendChild(cartItemElem);
  console.log(lastCartItem);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
