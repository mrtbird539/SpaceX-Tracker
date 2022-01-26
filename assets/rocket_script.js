//Making sure DOM loads before JS fires
$(document).ready(function (event) {
    //pulling HTML elements
    const greeting = document.getElementById("greeting");
    const rocketTable = document.getElementById("launch-table");

    //title placeholder
    let rocketName = "Loading...";

    //Pulls UUID out of URL and feeds it into a call to retrieve name again... Also needed for displayRocketData()
    function getRocketId() {
        const qValue = document.location.search.split("q=");
        rocketId = qValue[1];
        displayRocketData(rocketId);
        const url = `https://api.spacexdata.com/v4/rockets/${rocketId}`;

        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(function (data) {
                rocketName = data.name
            })
    }

    //Function to Call API and then create HTML Table with returned Data
    function displayRocketData(rocketId) {
        //API requires queries to be made through body and in JSON/MongoDB format
        //Also defines how I want to recieve the data. desc allows data to display from newest to oldest
        const fetchBody = {
            query: {
                rocket: rocketId
            },
            options: {
                sort: {
                    date_unix: "desc"
                }
            }
        }
        const url = "https://api.spacexdata.com/v4/launches/query"

        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify(fetchBody),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(function (data) {
                //Creates elements for each table and appends them onto the DOM
                for (var i = 0; i < data.docs.length; i++) {
                    let tableRow = document.createElement("tr");
                    let date = document.createElement("td");
                    let launchName = document.createElement("td");
                    let patch = document.createElement("img");
                    let success = document.createElement("td");
                    let launchDetails = document.createElement("td");
                    //Converts UNIX timestamp into required date format
                    let formatedDate = dayjs.unix(data.docs[i].date_unix).format("MMMM D YYYY")
                    date.textContent = formatedDate;
                    launchName.textContent = data.docs[i].name;
                    patch.setAttribute("src", data.docs[i].links.patch.small);
                    success.textContent = data.docs[i].success;
                    launchDetails.textContent = data.docs[i].details

                    //Left to show logic. Removed due to launchDetails giving the same data

                    // if (data.docs[i].success == false) {
                    //     let failureReason = data.docs[i].failures[0].reason;
                    // }
                    // else {
                    //     let failureReason = "N/A";
                    // }
                    rocketTable.append(tableRow)
                    tableRow.appendChild(date);
                    tableRow.appendChild(launchName);
                    tableRow.appendChild(patch);
                    tableRow.appendChild(success);
                    tableRow.appendChild(launchDetails);

                }
                //Updates Title
                greeting.innerHTML = `Showing data for ${rocketName}!`
                return;
            })
    }
    //Starts page
    getRocketId();
});