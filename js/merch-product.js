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


const increaseBtn = document.getElementById("increase-btn");
const decreaseBtn = document.getElementById("decrease-btn");
const quantitySpan = document.getElementById("quantity");
const totalPriceSpan = document.getElementById("total-price");

let quantity = 1;
const pricePerItem = 300;

function updateDisplay() {
  quantitySpan.textContent = quantity;
  totalPriceSpan.textContent = pricePerItem * quantity;
}

increaseBtn.addEventListener("click", () => {
  quantity++;
  updateDisplay();
});

decreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateDisplay();
  }
});

updateDisplay();
