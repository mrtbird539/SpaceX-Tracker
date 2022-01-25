function getRocketId() {
    const qValue = document.location.search.split("q=");
    rocketId = qValue[1];
    displayRocketData(rocketId);
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
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.docs.length; i++) {
                console.log(data.docs[i].date_unix)
                console.log(data.docs[i].name)
                console.log(data.docs[i].links.patch.small)
                console.log(data.docs[i].success)
                console.log(data.docs[i].details)
                console.log(data.docs[i].failures[0].reason)
            }
        })
}


getRocketId()
