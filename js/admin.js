const form = document.querySelector('#eventForm');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("eventTitle").value;
    const datetime = document.getElementById("eventDateTime").value;
    const location = document.getElementById("eventLocation").value;
    const desc = document.getElementById("eventDescription").value;
    const file = document.getElementById("eventPoster").value;

    const formData = {
        title: title,
        datetime: datetime,
        location: location,
        desc: desc,
        file: file
    };

    // 👇 Check for existing events array
    let events = JSON.parse(localStorage.getItem("events")) || [];

    // 👇 Add new event into array
    events.push(formData);

    // 👇 Save updated array back to localStorage
    localStorage.setItem("events", JSON.stringify(events));

    Toastify({
        text: "🎉 Event Added Successfully!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #662495ff, #0d7d81ff)",
        stopOnFocus: true
    }).showToast();

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
});
