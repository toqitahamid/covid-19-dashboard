import React, {useEffect, useState} from "react";
import {Card, Col, Empty, Row, Select} from 'antd';
import ConfirmedCard from "@/components/Cards/ConfirmedCard";
import {
  filterDataByFirstCase,
  getDailyCaseData,
  getDatewiseData, getFirstConfirmedDate,
  getLastSevenDaysData, getLastThirtyDaysData, getLastThreeDaysData,
  getLatestData, getLatestGlobalData,
  getTodayData,
  getYesterdayData
} from "@/utils/globalDataParser/getData";
import RecoveredCard from "@/components/Cards/RecoveredCard";
import ActiveCard from "@/components/Cards/ActiveCard";
import DeathsCard from "@/components/Cards/DeathsCard";
import GlobalDailyCard from "@/components/Cards/GlobalDailyCard";
import useStats from "../utils/useStats";
import moment from 'moment';
import 'moment/locale/en-gb'

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

moment.locale('en-gb');
const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];



function Selector({iso3}) {

  const iso2 = countries.alpha3ToAlpha2(iso3);
  console.log(iso2);
  console.log(iso3);

  const latestDataUrl = `https://covid19.mathdro.id/api/countries/${iso2}`;
  const {stats: latestData, loading: latestLoading, error: latestError} = useStats(latestDataUrl);
  // console.log(latestData);

  const globalDatewiseCountUrl = `https://covidapi.info/api/v1/country/${iso3}`;
  const {stats: globalDatewiseCountData, loading: globalDatewiseCountLoading, error: globalDatewiseCountError} = useStats(globalDatewiseCountUrl);



   if (latestLoading || globalDatewiseCountLoading) return <Card active='true' loading='true'/>;
  if (!latestData || !globalDatewiseCountData ) return <Card active='true' loading='true'/>;
  if (latestError || globalDatewiseCountError ) return <Empty/>;


  // current data
  const {confirmed: latestConfirmed, recovered: latestRecovered, deaths: latestDeaths, active: latestActive} = getLatestData(latestData);

  // historical timeline
  let {confirmed: confirmedTotalArray, recovered: recoveredTotalArray, deaths: deathsTotalArray, active: activeTotalArray} = getDatewiseData(globalDatewiseCountData);


  // get the first confirmed day
  const firstConfirmedDate = getFirstConfirmedDate(confirmedTotalArray);
  const  firstReported = moment(firstConfirmedDate).format('ll');


  // filter array from first reporting case
  confirmedTotalArray = filterDataByFirstCase(confirmedTotalArray, firstConfirmedDate);
  recoveredTotalArray = filterDataByFirstCase(recoveredTotalArray, firstConfirmedDate);
  deathsTotalArray = filterDataByFirstCase(deathsTotalArray, firstConfirmedDate);
  activeTotalArray = filterDataByFirstCase(activeTotalArray, firstConfirmedDate);


  const dailyTotalCaseData = {confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray};


  // calculate daily case from historical timeline
  const {confirmedDailyArray, recoveredDailyArray, deathsDailyArray, activeDailyArray} = getDailyCaseData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);
  const dailyCaseData = {confirmedDailyArray, recoveredDailyArray, deathsDailyArray, activeDailyArray};



  const { todayConfirmed, todayRecovered, todayDeaths, todayActive} =
    getTodayData(latestConfirmed, latestRecovered, latestDeaths, latestActive, confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const {yesterdayConfirmed, yesterdayRecovered, yesterdayDeaths, yesterdayActive} =
    getYesterdayData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const {lastThreeDayConfirmed, lastThreeDayRecovered, lastThreeDayDeaths, lastThreeDayActive} =
    getLastThreeDaysData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const {lastSevenDayConfirmed, lastSevenDayRecovered, lastSevenDayDeaths, lastSevenDayActive} =
    getLastSevenDaysData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const {lastThirtyDayConfirmed, lastThirtyDayRecovered, lastThirtyDayDeaths, lastThirtyDayActive} =
    getLastThirtyDaysData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const confirmedCardData =
    {latestConfirmed, confirmedArray: confirmedTotalArray, todayConfirmed, yesterdayConfirmed, lastThreeDayConfirmed, lastSevenDayConfirmed, lastThirtyDayConfirmed};

  // console.log(confirmedTotalArray);

  const recoveredCardData =
    {latestRecovered, latestConfirmed, recoveredArray: recoveredTotalArray, todayRecovered, yesterdayRecovered, lastThreeDayRecovered, lastSevenDayRecovered, lastThirtyDayRecovered};

  const activeCardData =
    {latestActive, activeArray: activeTotalArray, todayActive, yesterdayActive, lastThreeDayActive, lastSevenDayActive, lastThirtyDayActive};

  const deathsCardData =
    {latestDeaths, latestConfirmed, deathsArray: deathsTotalArray, todayDeaths, yesterdayDeaths, lastThreeDayDeaths, lastSevenDayDeaths, lastThirtyDayDeaths};

  return(
    <div>
      <Row type='flex' gutter={responsiveGutter}>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <ConfirmedCard data={confirmedCardData} reportTitle='First Reported' reportDate={firstReported}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <ActiveCard data={activeCardData}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <RecoveredCard data={recoveredCardData}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <DeathsCard data={deathsCardData}/>
        </Col>
      </Row>

      <Row type='flex' gutter={responsiveGutter}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <GlobalDailyCard dailyTotalCaseData={dailyTotalCaseData} dailyCaseData={dailyCaseData}/>
        </Col>
      </Row>
    </div>

  );
}

export default Selector;
