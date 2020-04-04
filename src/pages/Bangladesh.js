import React from "react";
import {Card, Col, Empty, Row} from 'antd';
import useStats from "@/utils/useStats";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {
  getDatewiseData,
  getFirstConfirmedDate,
  filterDataByFirstCase,
  getLatestData,
  getTodayData,
  getYesterdayData,
  getLastThreeDaysData,
  getLastSevenDaysData,
  getLastThirtyDaysData,
  getDailyCaseData
} from "@/utils/globalDataParser/getData";
import ConfirmedCard from "@/components/Cards/ConfirmedCard";
import ActiveCard from "@/components/Cards/ActiveCard";
import RecoveredCard from "@/components/Cards/RecoveredCard";
import DeathsCard from "@/components/Cards/DeathsCard";

import moment from 'moment';
import 'moment/locale/en-gb'
import GlobalDailyCard from "@/components/Cards/GlobalDailyCard";

moment.locale('en-gb');
const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];

function Bangladesh() {

  const latestDataUrl = 'https://covid19.mathdro.id/api/countries/BD';
  const {stats: latestData, loading: latestLoading, error: latestError} = useStats(latestDataUrl);


  const globalDatewiseCountUrl = 'https://covidapi.info/api/v1/country/BGD';
  const {stats: globalDatewiseCountData, loading: globalDatewiseCountLoading, error: globalDatewiseCountError} = useStats(globalDatewiseCountUrl);

  if (latestLoading || globalDatewiseCountLoading) return <Card active='true' loading='true'/>;
  if (!latestData || !globalDatewiseCountData) return <Card active='true' loading='true'/>;
  if (latestError || globalDatewiseCountError ) return <Empty/>;

  const {confirmed: latestConfirmed, recovered: latestRecovered, deaths: latestDeaths, active: latestActive} = getLatestData(latestData);

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

  const recoveredCardData =
    {latestRecovered, latestConfirmed, recoveredArray: recoveredTotalArray, todayRecovered, yesterdayRecovered, lastThreeDayRecovered, lastSevenDayRecovered, lastThirtyDayRecovered};

  const activeCardData =
    {latestActive, activeArray: activeTotalArray, todayActive, yesterdayActive, lastThreeDayActive, lastSevenDayActive, lastThirtyDayActive};

  const deathsCardData =
    {latestDeaths, latestConfirmed, deathsArray: deathsTotalArray, todayDeaths, yesterdayDeaths, lastThreeDayDeaths, lastSevenDayDeaths, lastThirtyDayDeaths};


  // calculate daily case from historical timeline
  const {confirmedDailyArray, recoveredDailyArray, deathsDailyArray, activeDailyArray} = getDailyCaseData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);
  const dailyCaseData = {confirmedDailyArray, recoveredDailyArray, deathsDailyArray, activeDailyArray};



  return (
    <PageHeaderWrapper>
      <Row type='flex' gutter={responsiveGutter}>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <ConfirmedCard data={confirmedCardData} reportTitle="First Reported" reportDate={firstReported}/>
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



    </PageHeaderWrapper>


  );
}

export default Bangladesh;


