const axios = require("axios");

class ControllerApp {
  static async showMuseumJakarta(req, res, next) {
    try {
      // console.log(process.env.JKT48_KEY);
      const result = await axios({
        method: `GET`,
        url: `http://api.jakarta.go.id/v1/museum`,
        headers: { Authorization: process.env.JKT48_KEY },
      });
      // console.log(result);
      res.status(200).json(result.data.data);
    } catch (error) {
      // res.status(500).json(error);
      next(error);
    }
  }

  static async showHolidays(req, res, next) {
    try {
      const result = await axios({
        method: `GET`,
        url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_KEY}&country=ID&year=2020`,
      });
      const found = result.data.response.holidays;
      const output = [];
      const month = new Date().toISOString().split("-")[1];
      // console.log(month);
      for (let i = 0; i < found.length; i++) {
        const element = found[i];
        if (element.date.datetime.month == month) {
          output.push(element);
        }
      }
      // res.status(200).json(result.data.response.holidays);
      res.status(200).json(output);
    } catch (error) {
      // res.status(500).json(error);
      next(error);
    }
  }

  static async showWeather(req, res, next) {
    try {
      // console.log('masuk');
      const result = await axios({
        method: `GET`,
        url: `https://api.openweathermap.org/data/2.5/weather?lat=-6.189112310695864&lon=106.84186652717992&appid=${process.env.WEATHER_KEY}`,
      });
      res.status(200).json(result.data);
    } catch (error) {
      // console.log(error);
      // res.status(500).json(error);
      next(error);
    }
  }
}

module.exports = ControllerApp;
