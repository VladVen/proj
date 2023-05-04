#!/usr/bin/env node
/** @format */

import { getArgs } from "./helpers/args.js";
import { KEY_DICTIONARY, getKeyValue, saveKeyValue } from "./services/storage.service.js";
import { printSuccess, printHelp, printError, printWeather } from "./services/log.service.js";
import { getWeather } from "./services/api.service.js";



const saveToken = async (token) => {
  if (!token.length) {
    printError("No Token");
    return;
  }
  try {
    await saveKeyValue(KEY_DICTIONARY.token, token);
    printSuccess("Token Saved");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  
  if (!city.length) {
    printError("No City");
    return;
  }
  try {
    await saveKeyValue(KEY_DICTIONARY.city, city);
    await getWeather()
    printSuccess("City Saved");
  } catch (e) {
    printError('Invalid City');
  }
};

const getForecast = async () => {

  try {
    const weather = await getWeather();
    printWeather(weather)
  } catch (error) {
    if (error?.response?.status == 404) {
      printError('Invalid city')
    } else if (error?.response?.status == 401) {
      printError('Invalid token')
    }  else {
      printError(`Something went wrong:  ${error.message}`)
    } 
  }
}

const initCLI = async() => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForecast()
};

initCLI();
