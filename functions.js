function cToF(c = Number) {
  return (c * 9) / 5 + 32;
}

document.querySelector("input").addEventListener("change", (e) => {
  const search = e.currentTarget.value;
  if (search) {
    fetch(
      `http://api.weatherstack.com/current?access_key=3a882bb6ace5c0770130da018e5e96d2&query=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === false) {
          return (document.getElementById("replace").innerHTML =
            "Please enter a valid place to search for!");
        }
        document.getElementById("location").innerHTML = data.location.country;
        if (data) {
          document.getElementById("replace").innerHTML = data.location.name;
          document.getElementById("icon").src = data.current.weather_icons[0];
          document.getElementById("results").innerHTML = `
          Temp: ${cToF(data.current.temperature)}°F <br>
          Feels like: ${cToF(data.current.feelslike)}°F <br>
          Weather Description: ${data.current.weather_descriptions[0]} <br>
          Wind Degree/Direction: ${data.current.wind_degree} degrees ${
            data.current.wind_dir
          }
          `;
        }
      });
  }
});
