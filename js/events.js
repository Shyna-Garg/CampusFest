let filerBtn = document.querySelectorAll(".filter-btn");
let cards = document.querySelectorAll(".event-card");
let searchInput = document.querySelector("#searchInput");

//filtering
filerBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filerBtn.forEach((button) => {
      button.classList.remove("bg-blue-700", "text-white");
      button.classList.add("bg-blue-100", "text-blue-700");
    });

    btn.classList.remove("bg-blue-100", "text-blue-700");
    btn.classList.add("bg-blue-700", "text-white");

    let selectedCategory = btn.getAttribute("data-filter");

    cards.forEach((card) => {
      let cardCategory = card.getAttribute("data-filter");

      if (selectedCategory === "all" || selectedCategory === cardCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

//searching
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  let anyVisible = false;
  cards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();

    if (cardText.includes(query)) {
      card.style.display = "block";
      anyVisible = true;
    } else {
      card.style.display = "none";
    }
  });

  const noResultMsg = document.getElementById("noResultMsg");
  if (anyVisible) {
    noResultMsg.classList.add("hidden");
  } else {
    noResultMsg.classList.remove("hidden");
  }
});


//event-detail page data displaying

// window.addEventListener("DOMContentLoaded", () => {
//   localStorage.removeItem("selectedEvent");
// });

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img").getAttribute("src");
    const category = card.querySelector(".category-btn").textContent.trim();
    const title = card.querySelector("h3").textContent.trim();
    const datetime = card.querySelector("p.text-gray-500").textContent.trim();
    const description = card.querySelector("p.text-gray-600").textContent.trim();

    const eventDetails = {
      image: img,
      category: category,
      title: title,
      datetime: datetime,
      description: description,
    };

    console.log("Saving this event to localStorage: ", eventDetails);
    localStorage.setItem("selectedEvent", JSON.stringify(eventDetails));

    window.location.href = "event-details.html"; // Adjust path if needed
  });
});

  




