import chalk from 'chalk'


export const printError = (error) => {
    console.log(chalk.bgRed(' Error ') + ' ' + error)
}

export const printSuccess = (message) => {
    console.log(chalk.bgGreen(' Success ') + ' ' + message)
}

export const printHelp = () => {
    console.log(
        `${chalk.bgCyan(' Help ') }
        Wihout params - to show weather in default/last city
        -s [CITY] - to set city
        -t [TOKEN] - to set API_TOKEN
        -h - to get help
        `
        )
}

export const printWeather = (res, icon) => {
    console.log(
        `${chalk.bgBlue(' Weather ') } in ${res.name}
        Weather: ${res.weather[0].description.toUpperCase()}
        Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
        Humidity: ${res.main.humidity} %
        Wind: ${res.wind.speed} m/s
         `
        )
}