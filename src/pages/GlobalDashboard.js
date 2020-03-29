import React from "react";
import useStats from "../utils/useStats";
import {Card, Col, Empty, Row, Typography} from 'antd';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ConfirmedCard from "@/components/Cards/ConfirmedCard";
import {
  getDatewiseDate,
  getLastSevenDaysData, getLastThirtyDaysData, getLastThreeDaysData,
  getLatestData,
  getTodayData,
  getYesterdayData
} from "@/utils/globalDataParser/getData";
import RecoveredCard from "@/components/Cards/RecoveredCard";
import ActiveCard from "@/components/Cards/ActiveCard";
import DeathsCard from "@/components/Cards/DeathsCard";
// import GlobalSummaryDonutChart from "./global/GlobalSummaryDonutChart";
// import LineChart from "@/components/Graph/LineChart";


const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];


function GlobalDashboard() {

  const latestDataUrl = 'https://covid19.mathdro.id/api';
  const {stats: latestData, loading: latestLoading, error: latestError} = useStats(latestDataUrl);

  const globalDatewiseCountUrl = 'https://covidapi.info/api/v1/global/count';
  const {stats: globalDatewiseCountData, loading: globalDatewiseCountLoading, error: globalDatewiseCountError} = useStats(globalDatewiseCountUrl);


  if (latestLoading || globalDatewiseCountLoading) return <Card active='true' loading='true'/>;
  if (!latestData || !globalDatewiseCountData) return <Card active='true' loading='true'/>;
  if (latestError || globalDatewiseCountError) return <Empty/>;

  const {confirmed: latestConfirmed, recovered: latestRecovered, deaths: latestDeaths, active: latestActive} = getLatestData(latestData);

  const {confirmed: confirmedArray, recovered: recoveredArray, deaths: deathsArray, active: activeArray} = getDatewiseDate(globalDatewiseCountData);



  const {
    todayConfirmed,
    todayRecovered,
    todayDeaths,
    todayActive
  } = getTodayData(
    latestConfirmed,
    latestRecovered,
    latestDeaths,
    latestActive,
    confirmedArray,
    recoveredArray,
    deathsArray,
    activeArray
  );

  const {
    yesterdayConfirmed,
    yesterdayRecovered,
    yesterdayDeaths,
    yesterdayActive
  } = getYesterdayData(confirmedArray, recoveredArray, deathsArray, activeArray);

  const {
    lastThreeDayConfirmed,
    lastThreeDayRecovered,
    lastThreeDayDeaths,
    lastThreeDayActive

  } = getLastThreeDaysData(confirmedArray, recoveredArray, deathsArray, activeArray);

  const {
    lastSevenDayConfirmed,
    lastSevenDayRecovered,
    lastSevenDayDeaths,
    lastSevenDayActive

  } = getLastSevenDaysData(confirmedArray, recoveredArray, deathsArray, activeArray);

  const {
    lastThirtyDayConfirmed,
    lastThirtyDayRecovered,
    lastThirtyDayDeaths,
    lastThirtyDayActive
  } = getLastThirtyDaysData(confirmedArray, recoveredArray, deathsArray, activeArray);

  const confirmedData = {latestConfirmed, confirmedArray, todayConfirmed, yesterdayConfirmed, lastThreeDayConfirmed, lastSevenDayConfirmed, lastThirtyDayConfirmed};

  const recoveredData =  {latestRecovered, latestConfirmed, recoveredArray, todayRecovered, yesterdayRecovered, lastThreeDayRecovered, lastSevenDayRecovered, lastThirtyDayRecovered};

  const activeData = {latestActive, activeArray, todayActive, yesterdayActive, lastThreeDayActive, lastSevenDayActive, lastThirtyDayActive};

  const deathsData = {latestDeaths, latestConfirmed, deathsArray, todayDeaths, yesterdayDeaths, lastThreeDayDeaths, lastSevenDayDeaths, lastThirtyDayDeaths};

  return (
    <PageHeaderWrapper>
      <Row type='flex' gutter={responsiveGutter}>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <ConfirmedCard data={confirmedData}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <ActiveCard data={activeData}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <RecoveredCard data={recoveredData}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <DeathsCard data={deathsData}/>
        </Col>



      </Row>
    </PageHeaderWrapper>


  );
}

export default GlobalDashboard;
