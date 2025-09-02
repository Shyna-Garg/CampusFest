const productItem = JSON.parse(localStorage.getItem("selectedProduct"));

if (!productItem) {
  alert("No product selected. Redirecting to merchandise page.");
  window.location.href = "./merch.html";
}

const productImg = document.getElementById("product-image");
const productTitle = document.getElementById("product-title");
const productPrice = document.getElementById("product-price");

productImg.src = productItem.image;
productTitle.textContent = productItem.name;
productPrice.textContent = "₹" + productItem.price;  
productPrice.setAttribute("data-price", productItem.price);


//size selection
const sizeBtns = document.querySelectorAll(".size-btn");
let selectedSize = ""; 

sizeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sizeBtns.forEach((b) => b.classList.remove("bg-blue-600", "text-white"));

btn.classList.add( "text-white", "bg-blue-600");

    selectedSize = btn.textContent.trim();
    console.log("Selected Size:", selectedSize);
  });
});


//quantity change + price updation 

document.addEventListener("DOMContentLoaded", () => {
  const increaseBtn = document.getElementById("increase-btn");
  const decreaseBtn = document.getElementById("decrease-btn");
  const quantitySpan = document.getElementById("quantity");
  const totalPriceSpan = document.getElementById("total-price");
  const productPriceElement = document.getElementById("product-price");

  // Cart summary elements
  const subtotalElement = document.getElementById("subtotal");
  const deliveryElement = document.getElementById("delivery");
  const totalElement = document.getElementById("total");

  // Get price from data attribute
  const productPrice = parseInt(productPriceElement.getAttribute("data-price"));

  let quantity = 1;
  let deliveryCharge = 50;

  function updatePrices() {
    const totalPrice = quantity * productPrice;
console.log("Quantity:", quantity);
  console.log("Product Price:", productPrice);
  console.log("Total Price:", totalPrice);
  console.log("Delivery:", deliveryCharge);

    // Update product section
    quantitySpan.textContent = quantity;
    totalPriceSpan.textContent = `₹${totalPrice}`;

    // Update cart summary
    subtotalElement.textContent = `₹${totalPrice}`;
    deliveryElement.textContent = `₹${deliveryCharge}`;
    totalElement.textContent = `₹${totalPrice + deliveryCharge}`;
  }

  increaseBtn.addEventListener("click", () => {
    quantity++;
    updatePrices();
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updatePrices();
    }
  });

  // Initial setup
  updatePrices();
});



//add to cart
const addToCartBtn = document.getElementById("add-to-cart-btn");

addToCartBtn.addEventListener("click", () => {
  if (!selectedSize) {
    alert("Please select a size before adding to cart.");
    return;
  }

  const quantity = parseInt(document.getElementById("quantity").textContent);
  const cartItem = {
    name: productItem.name,
    image: productItem.image,
    price: productItem.price,
    size: selectedSize,
    quantity: quantity
  };

  const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  existingCart.push(cartItem);
  localStorage.setItem("cartItems", JSON.stringify(existingCart));

  window.location.href = "cart.html";
});
