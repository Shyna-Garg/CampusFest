  //user data on ticket page
  const user = JSON.parse(localStorage.getItem("registrationData"));


  const container = document.getElementById("user-ticket-details");

  
  if (user) {
    container.innerHTML = `
      
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Roll No:</strong> ${user.roll}</p>
      <p><strong>Branch:</strong> ${user.branch}</p>
      <p><strong>Semester:</strong> ${user.semester}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `;
  } else {
    container.innerHTML = `<p class="text-red-400">No registration data found.</p>`;
  }


//event data on ticket page
const event = JSON.parse(localStorage.getItem("selectedEvent"));

const eventContainer = document.getElementById("event-ticket-details");

if (event) {
  eventContainer.innerHTML = `
    <h2 class="text-xl font-bold mb-3">🎫 Event Details</h2>
    <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover rounded mb-4" />
    <p><strong>Title:</strong> ${event.title}</p>
    <p><strong>Category:</strong> ${event.category}</p>
    <p><strong>Description:</strong> ${event.description}</p>
    <p><strong>Date:</strong> ${event.datetime}</p>
  `;
} else {
  eventContainer.innerHTML = `<p class="text-red-400">No event data found.</p>`;
}

// setTimeout(() => {
//   localStorage.removeItem("registrationData");
//   localStorage.removeItem("selectedEvent");
// }, 3000);
 


  document.getElementById("downloadBtn").addEventListener("click", () => {
    const ticketArea = document.createElement("div");

    // Clone your two sections into a wrapper
    const user = document.getElementById("user-ticket-details").cloneNode(true);
    const event = document.getElementById("event-ticket-details").cloneNode(true);

    ticketArea.appendChild(user);
    ticketArea.appendChild(event);
    ticketArea.style.padding = "20px";
    ticketArea.style.backgroundColor = "white"; // for white background

    // Hide from screen but keep in DOM to render
    ticketArea.style.position = "fixed";
    ticketArea.style.left = "-9999px";
    document.body.appendChild(ticketArea);

    html2canvas(ticketArea).then((canvas) => {
      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Clean up cloned content
      document.body.removeChild(ticketArea);
    });
  });



