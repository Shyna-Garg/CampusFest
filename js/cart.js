document.addEventListener("DOMContentLoaded", () => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalSpan = document.getElementById("subtotal");
  const deliverySpan = document.getElementById("delivery");
  const totalSpan = document.getElementById("total");

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      const itemDiv = document.createElement("div");
      itemDiv.className = "flex flex-col md:flex-row items-center gap-6 bg-white shadow-md rounded-lg p-4";

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="h-28 w-28 object-cover rounded-md" />
        <div class="flex-1 w-full space-y-1">
          <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
          <p class="text-sm text-gray-500">Size: ${item.size}</p>
          <div class="flex items-center gap-3 mt-2">
            <label class="text-sm">Qty:</label>
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input w-16 px-2 py-1 border rounded" />
            <p class="ml-auto font-semibold text-green-600 price-display">₹${itemTotal}</p>
          </div>
        </div>
        <button class="remove-btn text-red-700 bg-red-300 rounded p-1 hover:bg-red-600 hover:text-white text-sm" data-index="${index}">
          Remove
        </button>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });

    // Update summary values
    const deliveryFee = cartItems.length > 0 ? 50 : 0;
    subtotalSpan.textContent = `₹${totalPrice}`;
    deliverySpan.textContent = `₹${deliveryFee}`;
    totalSpan.textContent = `₹${totalPrice + deliveryFee}`;

    setupEventListeners(); // Reattach listeners after rendering
  }

  function setupEventListeners() {
    // Quantity change
    document.querySelectorAll(".qty-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const idx = e.target.getAttribute("data-index");
        const newQty = parseInt(e.target.value);
        if (newQty > 0) {
          cartItems[idx].quantity = newQty;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          updateCartDisplay();
        }
      });
    });

    // Remove item
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        cartItems.splice(idx, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartDisplay();
      });
    });
  }

  // Initial display
  updateCartDisplay();
});
