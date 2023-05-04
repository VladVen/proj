/** @format */

import axios from "axios";
import { KEY_DICTIONARY, getKeyValue } from "./storage.service.js";


export const getWeather = async (lang = "eng") => {
  const token = await getKeyValue(KEY_DICTIONARY.token);
  const city = await getKeyValue(KEY_DICTIONARY.city) ?? 'Kyiv'

  if (!token) {
    throw new Error("Invalid token, please set it with -t [TOKEN]");
  }

  const resp = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=${lang}&units=metric`
  );
 return resp.data;
};
