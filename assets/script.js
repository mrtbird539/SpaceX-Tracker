//JQuery
const rocketBtn$ = $(".rocket-btn")
const select$ = $("select");
const toast$ = $('.toast');
//Function for displaying all rockets in a dropdown and attaching the Id
//of the rocket for later queries
function renderRocketOptions() {
    const url = "https://api.spacexdata.com/v4/rockets";

    fetch(url)
        .then(function (response) {
            //Bail if fetch fails
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            //Loops over returned data and creates options for dropdown to dynamically show Rockets
            for (var i = 0; i < data.length; i++) {
                let rocketName = data[i].name;
                let rocketId = data[i].id;
                let rocketOptions = document.createElement("option");
                rocketOptions.innerHTML = rocketName;
                rocketOptions.value = rocketId;
                select$.append(rocketOptions);
                console.log(rocketId)
            }
            return
        });
}
//Function to input UUID of Rocket into URL to allow it to be extrapolated on next page's POST Request
function handleFormSubmit(event) {
    event.preventDefault();
    const inputVal = $("select option:selected").val();
    //Quick verification of input
    if (!inputVal) {
        return toast$.toast("show");
    }
    else {
        location.assign(`./rocket.html?q=${inputVal}`)
    };

}

rocketBtn$.click(handleFormSubmit);
renderRocketOptions();
