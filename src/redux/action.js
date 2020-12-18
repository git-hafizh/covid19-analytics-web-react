export const GET_DATA = "GET_DATA"
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME"
export const GET_SELECTED_COUNTRY = "GET_SELECTED_COUNTRY"
export const GET_PICK_COUNTRY = "GET_PICK_COUNTRY"

export const getGraphData = (confirmed, recovered, death, date) => {
  return {
    type: GET_DATA,
    payload: {
      graphConfirmed: confirmed,
      graphRecovered: recovered,
      graphDeath: death,
      graphDate: date
    }
  }
}

export const getCasesData = (confirmed, recovered, death) => {
  return {
    type: GET_DATA,
    payload: {
      casesConfirmed: confirmed,
      casesRecovered: recovered,
      casesDeath: death
    }
  }
}

export const getCountryName = (countryName) => {
  return {
    type: GET_COUNTRY_NAME,
    payload: countryName
  }
}

export const getCasesSelectedCountry = (confirmed, recovered, death) => {
  return {
    type: GET_SELECTED_COUNTRY,
    payload: {
      countryConfirmed: confirmed,
      countryRecovered: recovered,
      countryDeath: death,
    }
  }
}

export const getSelectedCountry = (country) => {
  return {
    type: GET_PICK_COUNTRY,
    payload: country
  }
}

