
const select$ = $('select');

function renderRocketOptions() {
    const url = "https://api.spacexdata.com/v4/rockets";

    fetch(url)
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                let rocketName = data[i].name;
                let rocketOptions = document.createElement("option");
                rocketOptions.innerHTML = rocketName
                select$.append(rocketOptions);
            }
            return
            });
}

renderRocketOptions();
