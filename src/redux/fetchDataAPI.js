import axios from 'axios';
import { GET_COUNTRY_NAME, GET_DATA, GET_NEWS_DATA, GET_PICK_COUNTRY, GET_SELECTED_COUNTRY } from './action';

export const getFetchGraphData = () => (dispatch) => {
  return (
    axios.get("https://indonesia-covid-19.mathdro.id/api/harian").then((result) => {
      let data = result.data.data;
      let confirmed = [];
      let recovered = [];
      let death = [];
      let date = [];
      data.forEach((item) => {
        confirmed.push(item.jumlahKasusBaruperHari);
        recovered.push(item.jumlahKasusSembuhperHari);
        death.push(item.jumlahKasusMeninggalperHari);

        //date convert
        const elDate = new Date(item.tanggal).toLocaleDateString("ID");
        const stringToDate = function (dateString) {
          const [dd, mm, yyyy] = dateString.split("/");
          return new Date(`${yyyy}-${mm}-${dd}`);
        };
        const convertDate = stringToDate(elDate).toString().split(" ");
        let dateArr = convertDate,
          removeDateFromIndex = [0, 4, 5, 6, 7, 8];

        for (var i = removeDateFromIndex.length - 1; i >= 0; i--)
          dateArr.splice(removeDateFromIndex[i], 1);

        let arr = dateArr[1];
        dateArr[1] = dateArr[0];
        dateArr[0] = arr;

        let dateCase = dateArr.join(" ");

        date.push(dateCase);
      });

      dispatch({
        type: GET_DATA,
        payload: {
          graphConfirmed: confirmed,
          graphRecovered: recovered,
          graphDeath: death,
          graphDate: date
        }
      })
    })
      .catch((err) => {
        console.log(err);
      })
  )
}

export const getFetchCasesData = () => (dispatch) => {
  return (
    axios.get("https://covid19.mathdro.id/api").then((result) => {
      let confirmed = result.data.confirmed.value;
      let recovered = result.data.recovered.value;
      let death = result.data.deaths.value;

      dispatch({
        type: GET_DATA,
        payload: {
          casesConfirmed: confirmed,
          casesRecovered: recovered,
          casesDeath: death,
        }
      })
    })
      .catch((err) => {
        console.log(err);
      })
  )
}

export const getFetchCountryName = () => (dispatch) => {
  return (
    axios.get("https://covid19.mathdro.id/api/countries").then((result) => {
      let datas = result.data.countries;
      let name = [];
      datas.forEach((record) => {
        name.push(record.name);
      })

      dispatch({
        type: GET_COUNTRY_NAME,
        payload: name
      })
    })
      .catch((err) => {
        console.log(err);
      })
  )
}

export const getFetchCasesSelectedCountry = (country) => async (dispatch) => {
  const query = country ? country : "Indonesia"
  await axios.get(`https://covid19.mathdro.id/api/countries/${query}`).then((result) => {
    let confirmed = result.data.confirmed.value;
    let recovered = result.data.recovered.value;
    let death = result.data.deaths.value;

    dispatch({
      type: GET_SELECTED_COUNTRY,
      payload: {
        countryConfirmed: confirmed,
        countryRecovered: recovered,
        countryDeath: death,
      }
    })

    dispatch({
      type: GET_PICK_COUNTRY,
      payload: query
    })
  })
    .catch((err) => {
      console.log("error message ", err);
    })

}

export const getNewsData = () => (dispatch) => {
  const thisApiKey = "8dd49b1983464a37aa7fac7c1111f95a";

  axios.get(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=covid&apiKey=${thisApiKey}`)
    .then((res) => {
      const news = res.data.articles

      dispatch({
        type: GET_NEWS_DATA,
        payload: news
      })
    })
    .catch((err) => {
      console.log("error message ", err);
    })
}