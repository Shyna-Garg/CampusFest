document.addEventListener("DOMContentLoaded", () => {
  const eventForm = document.getElementById("eventForm");
  const eventList = document.getElementById("eventList");

  // Local storage ton events fetch karlo
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Function -> Events display
  function displayEvents() {
    eventList.innerHTML = "";

    events.forEach((event, index) => {
      const eventCard = document.createElement("div");
      eventCard.className =
        "bg-white shadow-lg rounded-xl p-4 mb-4 border border-gray-200";

      eventCard.innerHTML = `
        <h3 class="text-xl font-bold text-gray-800">${event.title}</h3>
        <p class="text-gray-600"><span class="font-medium">Date:</span> ${event.datetime}</p>
        <p class="text-gray-600"><span class="font-medium">Location:</span> ${event.location}</p>
        <p class="text-gray-600"><span class="font-medium">Description:</span> ${event.desc}</p>
        <button data-index="${index}" 
          class="deleteBtn mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow">
          Delete
        </button>
      `;

      eventList.appendChild(eventCard);
    });

    // Har delete button te listener lagao
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        deleteEvent(index);
      });
    });
  }

  // Function -> Event delete
  function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
  }

  // Form submit -> Add new event
  if (eventForm) {
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newEvent = {
        name: document.getElementById("eventName").value,
        date: document.getElementById("eventDate").value,
        location: document.getElementById("eventLocation").value,
        description: document.getElementById("eventDescription").value,
      };

      events.push(newEvent);
      localStorage.setItem("events", JSON.stringify(events));

      eventForm.reset();
      displayEvents();
    });
  }

  // Page load te display
  displayEvents();
});
