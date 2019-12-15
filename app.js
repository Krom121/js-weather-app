window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let LocationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(postion =>{
           long = postion.coords.longitude;
           lat = postion.coords.latitude;
           // allow fix cors issue
           const proxy = "https://cors-anywhere.herokuapp.com/";
           const api = `${proxy}https://api.darksky.net/forecast/0b96d3e81148fea913d3845e3729fed9/${lat},${long}`;

           fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // access the data from api
                const { temperature, summary, icon } = data.currently;
                // set DOM elements from the api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                LocationTimezone.textContent = data.timezone;
                // Formula for clesius
                let clesius = (temperature - 32) * (5 / 9);

                // set icon from api
                setIcons(icon, document.querySelector(".icon"));

                // change temperature to celsius/farenheit
                temperatureSection.addEventListener("click", () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(clesius);
                    } else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });
    }
    // usage of the sky icons and replace api icon
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});