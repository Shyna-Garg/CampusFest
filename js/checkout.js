  document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // You can show just the first item, or modify to show multiple
    const firstItem = cartItems[0];
    let total = 0;

    if (firstItem) {
      // Update product summary for first item
      document.getElementById("checkout-product-image").src = firstItem.image;
      document.getElementById("checkout-product-title").textContent = firstItem.name;
      document.getElementById("checkout-product-size").textContent = firstItem.size;
      document.getElementById("checkout-product-qty").textContent = firstItem.quantity;
      document.getElementById("checkout-product-price").textContent = firstItem.price * firstItem.quantity;
    }

    // Calculate total for all items
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });

    // Add delivery charge
    const delivery = cartItems.length > 0 ? 50 : 0;
    const grandTotal = total + delivery;

    document.getElementById("checkout-total").textContent = grandTotal;

    // You can also show delivery & subtotal if needed
  });


document.getElementById("confirm-order").addEventListener("click", (e) => { 
  e.preventDefault(); 
  const name = document.getElementById("user-name").value;
  const phone = document.getElementById("user-phone").value;
  const address = document.getElementById("user-address").value;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const confirmBtn = document.getElementById('confirm-order-btn');

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const newOrders = cart.map(item => ({
    title: item.title,
    image: item.image,
    price: item.price,
    qty: item.quantity,
    size: item.size,
    date: new Date().toLocaleDateString("en-IN"),
    status: "Delivered"
  }));

  // Save orders
  localStorage.setItem("orders", JSON.stringify([...orders, ...newOrders]));

  // Clear cart after ordering
  localStorage.removeItem("cart");

  const newOrder = {
    customer: {
      name,
      phone,
      address,
    },
    items: cartItems,
    date: new Date().toLocaleString(),
  };

  // Get existing orders
  const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
  allOrders.push(newOrder);

  // Save updated orders
  localStorage.setItem("allOrders", JSON.stringify(allOrders));

  // Clear cart
  localStorage.removeItem("cartItems");

  // Show toast
  alert("🎉 Order Confirmed & Saved!");

  // Redirect after success
  
    window.location.href = "my-orders.html";

});
