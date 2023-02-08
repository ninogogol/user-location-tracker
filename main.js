import { Users } from "./classes/Users.js"

const userList = new Users()

const selectUser = document.querySelector('#selectUser')


var map = L.map('map').setView([41.716667, 44.783333], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

userList.getAllUsers()


// Add EventListener for changes in the select element and update the map when a new user is selected
selectUser.addEventListener('change', () => {

    const selectedUserId = selectUser.selectedOptions[0].id

     // Check if the selected option is default option "Choose a user..."
     // If true remove marker and display default location
     if (selectedUserId === "") {
        if (userList.marker) {
            map.removeLayer(userList.marker)
            userList.marker = null
            map.setView([41.716667, 44.783333], 13)
        }

        return
    }

    // Get the location of the selected user and update the map
    userList.getUserLocation(selectedUserId, map)

})
