const date = new Date();
let currentDate = date.getFullYear()+ "-" + (date.getMonth() + 1) + "-" + date.getDate()
let currentDateFormatted = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();

let dates = fetch('/api/dates/' +currentDate)
    .then(
        res=> res.json()
    ).then(
        calendar => {
        if (calendar != null) {
            document.getElementById("showDate").style.display = "block";
            document.getElementById("showDate").innerHTML = `<p>${calendar.name_event}</p>`;
        } else {
            document.getElementById("showDate").style.display = "none";
        }
    }
);