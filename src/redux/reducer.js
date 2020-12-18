import { GET_DATA, GET_COUNTRY_NAME, GET_SELECTED_COUNTRY, GET_PICK_COUNTRY } from "./action";

const initialState = {
  casesConfirmed: 0,
  casesRecovered: 0,
  casesDeath: 0,
  graphConfirmed: 0,
  graphRecovered: 0,
  graphDeath: 0,
  graphDate: 0,
  country: "Indonesia",
  nullCountry: "",
  countryName: [],
  countryConfirmed: 0,
  countryRecovered: 0,
  countryDeath: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA: {
      return {
        ...state,
        casesConfirmed: action.payload.casesConfirmed,
        casesRecovered: action.payload.casesRecovered,
        casesDeath: action.payload.casesDeath,
        graphConfirmed: action.payload.graphConfirmed,
        graphRecovered: action.payload.graphRecovered,
        graphDeath: action.payload.graphDeath,
        graphDate: action.payload.graphDate
      }
    }

    case GET_COUNTRY_NAME: {
      return {
        ...state,
        countryName: action.payload
      }
    }

    case GET_SELECTED_COUNTRY: {
      return {
        ...state,
        countryConfirmed: action.payload.countryConfirmed,
        countryRecovered: action.payload.countryRecovered,
        countryDeath: action.payload.countryDeath,
      }
    }

    case GET_PICK_COUNTRY: {
      return{
        ...state,
        country: action.payload
      }
    }

    default:
      return state;
  }
}

export default reducer;