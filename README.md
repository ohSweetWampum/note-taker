# note-taker

A note taker

## Website

[Cleck Here to Visit the Deployed Site](https://ohsweetwampum.github.io/weather-dashboard/)

## Description

This app displays the current day's weather as weel as the 5-day forecast for a particular city. You can search a city and the weather data will be displayed. Below the search box is an area for your recently searched citites so all you have to do is click on the city button and it's weather will be displayed. This app is quick to use and only gives essential up to date weather data.

## Installation

## Table of Contents

- [Website](#website)
- [Description](#description)
- [Installation](#installation)
- [Technology](#technology)
- [Usage](#usage)
- [Demo](#demo)
- [Code](#code)
- [Learning](#learning)
- [Author](#author)
- [Credits](#credits)
- [Contributing](#Contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Technology

- OpenWeatherAPIs
  [Learn about OpenWeather](https://openweathermap.org/api)

- Bootstrap
  [Learn about Bootstrap](https://getbootstrap.com/)

- Day.js
  [Learn about Day.js](https://day.js.org/)

- jQuery
  [Learn about jQuery](https://jquery.com/)

- JavaScript
  [Learn about JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- HTML
  [Learn about HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

- CSS
  [Learn about CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

- Git
  [Learn about Git](https://git-scm.com/)

## Usage

1. Enter a city in the search box, click "add city"
2. Weather data will then pop up
3. Your recently searched for cities will populate as buttons below the search box, you can click on these buttons to see the citie's weather data instead of searching again

# Demo

![Alt Text](./images/gifs/123.png)

## Code

I wanted to highlight this code snippet because I think it might be the first time I added html elements withing my JavaScript in this particular way and I just that it was neat.all the data (forecastDate, iconUrl, highTemp, lowTemp, wind speed and humidity) values are inserted using string concatenation.

```JavaScript
  var card = document.createElement("div");
      card.classList.add("col");
      card.innerHTML = '<div class="card border-dark bg-white"><div class="card-body">' +
        '<h5 class="card-title">' + forecastDate + '</h5>' +
        '<img src="' + iconUrl + '">' +
        '<p class="card-text">High: ' + highTemp + '°F</p>' +
        '<p class="card-text">Low: ' + lowTemp + '°F</p>' +
        '<p class="card-text">Wind: ' + forecastsForDate[0].wind.speed + ' mph</p>' +
        '<p class="card-text">Humidity: ' + forecastsForDate[0].main.humidity + '%</p>' +
        '</div></div>';
```

## Learning

- Furthered knowledge of local storage, saving and retrieving
- Learned how to use the spread operator
- learned how to utilize 3rd party APIs, calling, response, etc.
- Learned how add icons

## Author

Matthew Gibson

- [Portfolio](https://github.com/ohSweetWampum)
- [LinkedIn](https://www.linkedin.com/in/matthew-gibson-6b9b12237/)
- [Github](https://github.com/ohSweetWampum)

## Credits

[meyerweb.com](https://meyerweb.com/eric/tools/css/reset/)
(For my reset.css file)

[mdnwebdocs.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
(spread operator)

[day.js.org](https://day.js.org/)
(Day.js documents)

[jQuery.com](https://jquery.com/)
(jQuery Documents)

[OpenWeatherMap.org](https://openweathermap.org/api)
(weather APIs)

## Contributing

## Tests

## Questions

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

```

```
