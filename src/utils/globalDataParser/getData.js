const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function flattenArray(data) {
  // our initial value this time is a blank array
  const initialValue = [];

  // call reduce on our data
  return data.reduce((total, value) => {
    // if the value is an array then recursively call reduce
    // if the value is not an array then just concat our value
    return total.concat(Array.isArray(value) ? flattenArray(value) : value);
  }, initialValue);
}


function getLatestGlobalData(data) {
  //
  // const latestData = flattenArray(data.result);
  //
  // const tempData = Object.entries(latestData).map(([key, value ]) => ({
  //       country: latestData[key], confirmed: latestData[key].confirmed, deaths: latestData[key].deaths, recovered: latestData[key].recovered
  //     }));
  // console.log(tempData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onlyUnique(value, index, self) {
    return value.country !== undefined;
  }

  let latestData = [];
  const arraySize = data.result.length -1;
  // eslint-disable-next-line no-plusplus
  for (let x = 0; x <= arraySize; x++) {
    const tempData = Object.entries(data.result[x]).map(([value, id ]) => ({
      key: x, country: countries.getName(value, "en"), confirmed: id.confirmed,
      deaths: id.deaths, recovered: id.recovered, country_code: countries.alpha3ToAlpha2(value)
    }));
    latestData.push(...tempData);
  }

  latestData = latestData.filter(onlyUnique);
  return latestData;

}


function getLatestData(data) {

  const confirmed = data.confirmed.value;
  const recovered = data.recovered.value;
  const deaths = data.deaths.value;
  const active = confirmed - deaths - recovered;


  return {
    confirmed,
    recovered,
    deaths,
    active};

}


function getDailyCaseData(confirmedArray, recoveredArray, deathsArray, activeArray) {

  const arraySize = confirmedArray.length -1;

  const confirmedDailyArray = [];
  const recoveredDailyArray = [];
  const deathsDailyArray = [];
  const activeDailyArray = [];

  // eslint-disable-next-line no-plusplus
  for (let x = 1; x <= arraySize; x++) {
    const tempData = {Date: confirmedArray[x].Date, type: confirmedArray[x].type ,value: confirmedArray[x].value - confirmedArray[x-1].value};
    confirmedDailyArray.push(tempData);
  }

  // eslint-disable-next-line no-plusplus
  for (let x = 1; x <= arraySize; x++) {
    const tempData = {Date: recoveredArray[x].Date, type: recoveredArray[x].type ,value: recoveredArray[x].value - recoveredArray[x-1].value};
    recoveredDailyArray.push(tempData);
  }

  // eslint-disable-next-line no-plusplus
  for (let x = 1; x <= arraySize; x++) {
    const tempData = {Date: deathsArray[x].Date, type: deathsArray[x].type ,value: deathsArray[x].value - deathsArray[x-1].value};
    deathsDailyArray.push(tempData);
  }


  // eslint-disable-next-line no-plusplus
  for (let x = 1; x <= arraySize; x++) {
    const tempData = {Date: activeArray[x].Date, type: activeArray[x].type ,value: activeArray[x].value - activeArray[x-1].value};
    activeDailyArray.push(tempData);
  }

  return {
    confirmedDailyArray,
    recoveredDailyArray,
    deathsDailyArray,
    activeDailyArray,
  }

}




function getDatewiseData(data) {

  const confirmed = Object.entries(data.result).map(([value ]) => ({
    Date: value, type: 'Confirmed', value: data.result[value].confirmed
  }));

  const recovered = Object.entries(data.result).map(([value]) => ({
    Date: value, type: 'Recovered', value: data.result[value].recovered
  }));

  const deaths = Object.entries(data.result).map(([value ]) => ({
    Date: value, type: 'Death', value: data.result[value].deaths
  }));

  const active = Object.entries(data.result).map(([ value  ]) => ({
    Date: value, type: 'Active', value: data.result[value].confirmed - data.result[value].recovered - data.result[value].deaths
  }));



  return {
    confirmed,
    recovered,
    deaths,
    active
  }

}


function getTodayData(latestConfirmed, latestRecovered, latestDeaths, latestActive, confirmedArray, recoveredArray, deathsArray, activeArray) {

  const todayDate = new Date();
  const arrayLastDate = new Date(confirmedArray[confirmedArray.length - 1].Date);

  let todayConfirmed = 0;
  let todayRecovered = 0;
  let todayDeaths = 0;
  let todayActive = 0;



  if (todayDate > arrayLastDate){
    todayConfirmed = latestConfirmed - confirmedArray[confirmedArray.length - 1].value;
    todayRecovered = latestRecovered - recoveredArray[recoveredArray.length - 1].value;
    todayDeaths = latestDeaths - deathsArray[deathsArray.length - 1].value;
    todayActive = latestActive - activeArray[activeArray.length - 1].value;
  }
  else {
    todayConfirmed = confirmedArray[confirmedArray.length - 1].value - confirmedArray[confirmedArray.length - 2].value;
    todayRecovered = recoveredArray[recoveredArray.length - 1].value - recoveredArray[recoveredArray.length - 2].value;
    todayDeaths = deathsArray[deathsArray.length - 1].value - deathsArray[deathsArray.length - 2].value;
    todayActive = activeArray[activeArray.length - 1].value - activeArray[activeArray.length - 2].value;
  }

  return {
    todayConfirmed,
    todayRecovered,
    todayDeaths,
    todayActive
  }
}


function getYesterdayData(confirmedArray, recoveredArray, deathsArray, activeArray) {
  const todayDate = new Date();
  const arrayLastDate = new Date(confirmedArray[confirmedArray.length - 1].Date);

  let yesterdayConfirmed = 0;
  let yesterdayRecovered= 0;
  let yesterdayDeaths = 0;
  let yesterdayActive = 0;


  if (todayDate > arrayLastDate){

    yesterdayConfirmed = confirmedArray[confirmedArray.length - 1].value - confirmedArray[confirmedArray.length - 2].value;
    yesterdayRecovered = recoveredArray[recoveredArray.length - 1].value - recoveredArray[recoveredArray.length - 2].value;
    yesterdayDeaths = deathsArray[deathsArray.length - 1].value - deathsArray[deathsArray.length - 2].value;
    yesterdayActive = activeArray[activeArray.length - 1].value - activeArray[activeArray.length - 2].value;

  }

  else {
    yesterdayConfirmed = confirmedArray[confirmedArray.length - 2].value - confirmedArray[confirmedArray.length - 3].value;
    yesterdayRecovered = recoveredArray[recoveredArray.length - 2].value - recoveredArray[recoveredArray.length - 3].value;
    yesterdayDeaths = deathsArray[deathsArray.length - 2].value - deathsArray[deathsArray.length - 3].value;
    yesterdayActive = activeArray[activeArray.length - 2].value - activeArray[activeArray.length - 3].value;

  }

  return {
    yesterdayConfirmed,
    yesterdayRecovered,
    yesterdayDeaths,
    yesterdayActive

  }

}


function getLastThreeDaysData(confirmedArray, recoveredArray, deathsArray, activeArray) {
  const todayDate = new Date();
  const arrayLastDate = new Date(confirmedArray[confirmedArray.length - 1].Date);

  let lastThreeDayConfirmed = 0;
  let lastThreeDayRecovered= 0;
  let lastThreeDayDeaths = 0;
  let lastThreeDayActive = 0;

  let tempConfirmedData = 0;
  let tempRecoveredData = 0;
  let tempDeathsData = 0;
  let tempActiveData = 0;




  // If todays data is not uploaded by JHU
  if (todayDate > arrayLastDate){

    const arraySize = confirmedArray.length - 1 ;
    const startIndex = confirmedArray.length - 3 ;

    // eslint-disable-next-line no-plusplus
    for (let x = startIndex; x <= arraySize; x++)   {
      tempConfirmedData = Math.abs(confirmedArray[x].value - confirmedArray[x-1].value);
      tempRecoveredData = Math.abs(recoveredArray[x].value - recoveredArray[x-1].value);
      tempDeathsData = Math.abs(deathsArray[x].value - deathsArray[x-1].value);
      tempActiveData = Math.abs(activeArray[x].value - activeArray[x-1].value);

      lastThreeDayConfirmed  += tempConfirmedData;
      lastThreeDayRecovered += tempRecoveredData;
      lastThreeDayDeaths += tempDeathsData;
      lastThreeDayActive += + tempActiveData;
    }
  }

  // todays data is uploaded by JHU
  else {

    const arraySize = confirmedArray.length - 2 ;
    const startIndex = confirmedArray.length - 4 ;

    // eslint-disable-next-line no-plusplus
    for (let x = startIndex; x <= arraySize; x++)   {
      tempConfirmedData = Math.abs(confirmedArray[x].value - confirmedArray[x-1].value);
      tempRecoveredData = Math.abs(recoveredArray[x].value - recoveredArray[x-1].value);
      tempDeathsData = Math.abs(deathsArray[x].value - deathsArray[x-1].value);
      tempActiveData = Math.abs(activeArray[x].value - activeArray[x-1].value);

      lastThreeDayConfirmed  += tempConfirmedData;
      lastThreeDayRecovered += tempRecoveredData;
      lastThreeDayDeaths += tempDeathsData;
      lastThreeDayActive += + tempActiveData;
    }
  }

  return {
    lastThreeDayConfirmed,
    lastThreeDayRecovered,
    lastThreeDayDeaths,
    lastThreeDayActive

  }

}


function getLastSevenDaysData(confirmedArray, recoveredArray, deathsArray, activeArray) {
  const todayDate = new Date();
  const arrayLastDate = new Date(confirmedArray[confirmedArray.length - 1].Date);

  let lastSevenDayConfirmed = 0;
  let lastSevenDayRecovered= 0;
  let lastSevenDayDeaths = 0;
  let lastSevenDayActive = 0;

  let tempConfirmedData = 0;
  let tempRecoveredData = 0;
  let tempDeathsData = 0;
  let tempActiveData = 0;

  // If todays data is not uploaded by JHU
  if (todayDate > arrayLastDate){

    const arraySize = confirmedArray.length - 1 ;
    const startIndex = confirmedArray.length - 7 ;

    // eslint-disable-next-line no-plusplus
    for (let x = startIndex; x <= arraySize; x++)   {
      tempConfirmedData = Math.abs(confirmedArray[x].value - confirmedArray[x-1].value);
      tempRecoveredData = Math.abs(recoveredArray[x].value - recoveredArray[x-1].value);
      tempDeathsData = Math.abs(deathsArray[x].value - deathsArray[x-1].value);
      tempActiveData = Math.abs(activeArray[x].value - activeArray[x-1].value);

      lastSevenDayConfirmed  += tempConfirmedData;
      lastSevenDayRecovered += tempRecoveredData;
      lastSevenDayDeaths += tempDeathsData;
      lastSevenDayActive += + tempActiveData;
    }
  }

  // todays data is uploaded by JHU
  else {

    const arraySize = confirmedArray.length - 2 ;
    const startIndex = confirmedArray.length - 8 ;

    // eslint-disable-next-line no-plusplus
    for (let x = startIndex; x <= arraySize; x++)   {
      tempConfirmedData = Math.abs(confirmedArray[x].value - confirmedArray[x-1].value);
      tempRecoveredData = Math.abs(recoveredArray[x].value - recoveredArray[x-1].value);
      tempDeathsData = Math.abs(deathsArray[x].value - deathsArray[x-1].value);
      tempActiveData = Math.abs(activeArray[x].value - activeArray[x-1].value);

      lastSevenDayConfirmed  += tempConfirmedData;
      lastSevenDayRecovered += tempRecoveredData;
      lastSevenDayDeaths += tempDeathsData;
      lastSevenDayActive += + tempActiveData;
    }
  }

  return {
    lastSevenDayConfirmed,
    lastSevenDayRecovered,
    lastSevenDayDeaths,
    lastSevenDayActive

  }

}

function getLastThirtyDaysData(confirmedArray, recoveredArray, deathsArray, activeArray) {
  const todayDate = new Date();
  const arrayLastDate = new Date(confirmedArray[confirmedArray.length - 1].Date);

  let lastThirtyDayConfirmed = 0;
  let lastThirtyDayRecovered= 0;
  let lastThirtyDayDeaths = 0;
  let lastThirtyDayActive = 0;

  let tempConfirmedData = 0;
  let tempRecoveredData = 0;
  let tempDeathsData = 0;
  let tempActiveData = 0;




  // If todays data is not uploaded by JHU
  if (todayDate > arrayLastDate){

    const arraySize = confirmedArray.length - 1 ;
    const startIndex = confirmedArray.length - 30 ;

    // eslint-disable-next-line no-plusplus
    for (let x = startIndex; x < arraySize; x++)   {
      tempConfirmedData = Math.abs(confirmedArray[x].value - confirmedArray[x-1].value);
      tempRecoveredData = Math.abs(recoveredArray[x].value - recoveredArray[x-1].value);
      tempDeathsData = Math.abs(deathsArray[x].value - deathsArray[x-1].value);
      tempActiveData = Math.abs(activeArray[x].value - activeArray[x-1].value);

      lastThirtyDayConfirmed  += tempConfirmedData;
      lastThirtyDayRecovered += tempRecoveredData;
      lastThirtyDayDeaths += tempDeathsData;
      lastThirtyDayActive += + tempActiveData;
    }
  }

  // todays data is uploaded by JHU
  else {

    const arraySize = confirmedArray.length - 2 ;
    const startIndex = confirmedArray.length - 31 ;

    // eslint-disable-next-line no-plusplus
    for (let x = startIndex; x < arraySize; x++)   {
      tempConfirmedData = Math.abs(confirmedArray[x].value - confirmedArray[x-1].value);
      tempRecoveredData = Math.abs(recoveredArray[x].value - recoveredArray[x-1].value);
      tempDeathsData = Math.abs(deathsArray[x].value - deathsArray[x-1].value);
      tempActiveData = Math.abs(activeArray[x].value - activeArray[x-1].value);

      lastThirtyDayConfirmed  += tempConfirmedData;
      lastThirtyDayRecovered += tempRecoveredData;
      lastThirtyDayDeaths += tempDeathsData;
      lastThirtyDayActive += + tempActiveData;
    }
  }

  return {
    lastThirtyDayConfirmed,
    lastThirtyDayRecovered,
    lastThirtyDayDeaths,
    lastThirtyDayActive

  }

}


export {getLatestData, getDatewiseData, getTodayData, getYesterdayData, getLastThreeDaysData,
  getLastSevenDaysData, getLastThirtyDaysData, getLatestGlobalData, getDailyCaseData};
