//Making sure DOM loads before JS fires
$(document).ready(function(event) { 
    //pulling HTML elements
    const greeting = document.getElementById("greeting");
    const rocketTable = document.getElementById("launch-table");

    //title placeholder
    let rocketName = "Loading...";

    //
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


    function displayRocketData(rocketId) {

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
                console.log(data);
                for (var i = 0; i < data.docs.length; i++) {
                    let tableRow = document.createElement("tr");
                    let date = document.createElement("td");
                    let launchName = document.createElement("td");
                    let patch = document.createElement("img");
                    let success = document.createElement("td");
                    let launchDetails = document.createElement("td");
                    let formatedDate = dayjs.unix(data.docs[i].date_unix).format("MMMM D YYYY")
                    date.textContent = formatedDate;
                    launchName.textContent = data.docs[i].name;
                    patch.setAttribute("src", data.docs[i].links.patch.small);
                    success.textContent = data.docs[i].success;
                    launchDetails.textContent = data.docs[i].details
                    
                    if (data.docs[i].success == false) {
                        let failureReason = data.docs[i].failures[0].reason;
                    }
                    else {
                        let failureReason = "N/A";
                    }
                    rocketTable.append(tableRow)
                    tableRow.appendChild(date);
                    tableRow.appendChild(launchName);
                    tableRow.appendChild(patch);
                    tableRow.appendChild(success);
                    tableRow.appendChild(launchDetails);

                }
                greeting.innerHTML = `Showing data for ${rocketName}!`
                return;
            })
    }

    getRocketId();
});