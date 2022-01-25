function getRocketId() {
    const qValue = document.location.search.split("q=");
    rocketId = qValue[1];
    displayRocketData(rocketId);
}


function displayRocketData(rocketId) {
    const fetchBody = `{
        "query": {
        "rocket": "${rocketId}"
        }
    }`
    const url = "https://api.spacexdata.com/v4/launches/query"

    fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        body: JSON.stringify(fetchBody),
    })
    .then(function(response) {
    return response.json()
    })
    .then(function(data) {
        console.log(data);
    })
}


getRocketId()
