document.addEventListener("DOMContentLoaded", () => {
  const eventTitle = document.getElementById("eventTitle");
  if (!eventTitle) {
    console.warn("eventTitle not found — maybe you're not on event-details page?");
    return;
  }

  const eventImage = document.getElementById("eventImage");
  const eventCategory = document.getElementById("eventCategory");
  const eventDate = document.getElementById("eventDateLocation");
  const eventDesc = document.getElementById("eventDescription");

  const eventData = JSON.parse(localStorage.getItem("selectedEvent"));
  console.log("Script loaded ✅");

  if (eventData) {
    eventTitle.textContent = eventData.title;
    eventDesc.textContent = eventData.description;
    eventCategory.textContent = eventData.category;
    eventDate.textContent = eventData.datetime;
    eventImage.src = eventData.image;
    console.log("Event data loaded:", eventData);
  } else {
    console.warn("No data found in localStorage. You might have opened this page directly.");
  }
});



//registeration form data saving

  document.getElementById("event-register-form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const roll = document.getElementById("user-roll").value;
    const branch = document.getElementById("user-branch").value;
    const semester = document.getElementById("user-semester").value;
    const phone = document.getElementById("user-phone").value;

    const userData = {
      name,
      email,
      roll,
      branch,
      semester,
      phone
    };

    localStorage.setItem("registrationData", JSON.stringify(userData));
    console.log(userData);

    window.location.href = "./ticket-confirmation.html";
  });

