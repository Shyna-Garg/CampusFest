let buttons = document.querySelectorAll(".buy-now-btn");

buttons.forEach((button) => {
button.addEventListener("click" , ()=>{
    const card = button.closest(".product-card");
    const products = {
        image : card.dataset.image,
        name :  card.dataset.name,
        price : card.dataset.price
    }
    console.log("Saving",products);
    localStorage.setItem("selectedProduct" , JSON.stringify(products));
    window.location.href = "merch-product.html";
})
})