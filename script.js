const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movie")

let ticketPrice = Number(movieSelect.value);

populateUI()

// Save Movie Data

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)
}

// Updating Selected Count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    })
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))
    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount;
    total.innerText = ticketPrice * selectedSeatsCount;
}

// Get Data From LOcal Storage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")
    const selectedMoviePrice = localStorage.getItem("selectedMoviePrice")
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
        ticketPrice = selectedMoviePrice
    }
    // updateSelectedCount()
}

// Movie Select Event
movieSelect.addEventListener("change", event => {
    ticketPrice = Number(event.target.value)
    setMovieData(event.target.selectedIndex, event.target.value)
    updateSelectedCount()
})


// Event Listener for Seats
container.addEventListener("click", event => {
    if (event.target.classList.contains("seat") && !event.target.classList.contains("occupied")) {
        event.target.classList.toggle("selected")
        updateSelectedCount();
    }
})
// Initial Count
updateSelectedCount()