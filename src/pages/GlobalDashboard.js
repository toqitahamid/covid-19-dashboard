import React from "react";
import useStats from "../utils/useStats";
import {Card, Col, Empty, Row, Table, Typography} from 'antd';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ConfirmedCard from "@/components/Cards/ConfirmedCard";
import {
  getDailyCaseData,
  getDatewiseData,
  getLastSevenDaysData, getLastThirtyDaysData, getLastThreeDaysData,
  getLatestData, getLatestGlobalData,
  getTodayData,
  getYesterdayData
} from "@/utils/globalDataParser/getData";
import RecoveredCard from "@/components/Cards/RecoveredCard";
import ActiveCard from "@/components/Cards/ActiveCard";
import DeathsCard from "@/components/Cards/DeathsCard";
import GlobalTableCard from "@/components/Cards/GlobalTableCard";
import GlobalDailyCard from "@/components/Cards/GlobalDailyCard";
// import GlobalSummaryDonutChart from "./global/GlobalSummaryDonutChart";
// import LineChart from "@/components/Graph/LineChart";


const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];
const { Text } = Typography;

function GlobalDashboard() {

  const latestDataUrl = 'https://covid19.mathdro.id/api';
  const {stats: latestData, loading: latestLoading, error: latestError} = useStats(latestDataUrl);

  const globalDatewiseCountUrl = 'https://covidapi.info/api/v1/global/count';
  const {stats: globalDatewiseCountData, loading: globalDatewiseCountLoading, error: globalDatewiseCountError} = useStats(globalDatewiseCountUrl);

  // https://covidapi.info/api/v1/global/latest
  const globalLatestDataCountUrl = 'https://covidapi.info/api/v1/global/latest';
  const {stats: globalLatestDataCount, loading: globalLatestDataCountLoading, error: globalLatestDataCountError} = useStats(globalLatestDataCountUrl);


  if (latestLoading || globalDatewiseCountLoading || globalLatestDataCountLoading) return <Card active='true' loading='true'/>;
  if (!latestData || !globalDatewiseCountData || !globalLatestDataCount) return <Card active='true' loading='true'/>;
  if (latestError || globalDatewiseCountError || globalLatestDataCountError) return <Empty/>;


  const globalLatestDataTotal =  getLatestGlobalData(globalLatestDataCount);

  const {confirmed: latestConfirmed, recovered: latestRecovered, deaths: latestDeaths, active: latestActive} = getLatestData(latestData);

  const {confirmed: confirmedTotalArray, recovered: recoveredTotalArray, deaths: deathsTotalArray, active: activeTotalArray} = getDatewiseData(globalDatewiseCountData);

  const dailyTotalCaseData = {confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray};

  const {latestData: dailyCaseData} = getDailyCaseData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);



  //console.log(dailyCaseData);

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
    confirmedTotalArray,
    recoveredTotalArray,
    deathsTotalArray,
    activeTotalArray
  );

  const {
    yesterdayConfirmed,
    yesterdayRecovered,
    yesterdayDeaths,
    yesterdayActive
  } = getYesterdayData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const {
    lastThreeDayConfirmed,
    lastThreeDayRecovered,
    lastThreeDayDeaths,
    lastThreeDayActive

  } = getLastThreeDaysData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const {
    lastSevenDayConfirmed,
    lastSevenDayRecovered,
    lastSevenDayDeaths,
    lastSevenDayActive

  } = getLastSevenDaysData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const {
    lastThirtyDayConfirmed,
    lastThirtyDayRecovered,
    lastThirtyDayDeaths,
    lastThirtyDayActive
  } = getLastThirtyDaysData(confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray);

  const confirmedCardData = {latestConfirmed, confirmedArray: confirmedTotalArray, todayConfirmed, yesterdayConfirmed, lastThreeDayConfirmed, lastSevenDayConfirmed, lastThirtyDayConfirmed};

  const recoveredCardData =  {latestRecovered, latestConfirmed, recoveredArray: recoveredTotalArray, todayRecovered, yesterdayRecovered, lastThreeDayRecovered, lastSevenDayRecovered, lastThirtyDayRecovered};

  const activeCardData = {latestActive, activeArray: activeTotalArray, todayActive, yesterdayActive, lastThreeDayActive, lastSevenDayActive, lastThirtyDayActive};

  const deathsCardData = {latestDeaths, latestConfirmed, deathsArray: deathsTotalArray, todayDeaths, yesterdayDeaths, lastThreeDayDeaths, lastSevenDayDeaths, lastThirtyDayDeaths};

  return (
    <PageHeaderWrapper>
      <Row type='flex' gutter={responsiveGutter}>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <ConfirmedCard data={confirmedCardData}/>
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

      <Row type='flex' gutter={responsiveGutter} >

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>

          <GlobalTableCard data={globalLatestDataTotal}/>
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

export default GlobalDashboard;
