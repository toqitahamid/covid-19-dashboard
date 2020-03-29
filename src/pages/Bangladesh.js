import React from "react";
import {Card, Col, Divider, Empty, Row, Statistic, Typography} from 'antd';
import {readRemoteFile} from "react-papaparse";
import useStats from "@/utils/useStats";
import CardAreaChart from "@/components/Graph/CardAreaChart";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import LogRocket from 'logrocket';

LogRocket.init('ti0gyn/corona-bd');


const { Text } = Typography;

const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];

let historicalActiveArray = [];
let historicalConfirmedArray = [];
let historicalRecoveredArray = [];
let historicalDeathsArray = [];

function Bangladesh() {
  const {stats, loading, error} = useStats('https://covid19.mathdro.id/api/countries/BD');
  // const {stats: todayStats, todayLoading, todayError} = useStats('https://corona.lmao.ninja/countries/bangladesh?strict=true');

  // const {stats: historicalStats, historicalLoading, historicalError} = useStats('https://corona.lmao.ninja/historical/bangladesh');

  const todayDate = new Date().getDate();


  readRemoteFile('https://raw.githubusercontent.com/ulklc/covid19-timeseries/master/countryReport/country/BD.csv', {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {

      historicalActiveArray = Object.entries(results.data).map(([id, value   ]) => ({
        Date: results.data[id].day, type: 'Active', value: results.data[id].confirmed-results.data[id].recovered - results.data[id].death
      }));
      historicalConfirmedArray = Object.entries(results.data).map(([id, value]) => ({
        Date: results.data[id].day, type: 'Confirmed', value: results.data[id].confirmed
      }));

      historicalRecoveredArray = Object.entries(results.data).map(([id, value]) => ({
        Date: results.data[id].day, type: 'Recovered', value: results.data[id].recovered
      }));

      historicalDeathsArray = Object.entries(results.data).map(([id, value]) => ({
        Date: results.data[id].day, type: 'Death', value: results.data[id].death
      }));
    }

  });


  if (loading ) return <Card active='true' loading='true'/>;
  if (!stats ) return <Card active='true' loading='true'/>;
  if (error  ) return <Empty/>;

  // const historicalConfirmed = historicalStats.timeline.cases;
  // const historicalConfirmedArray = Object.entries(historicalConfirmed).map(([value, id]) => ({Date: value, type: 'Confirmed', value: historicalConfirmed[value]}));
  //
  // const historicalRecovered = historicalStats.timeline.recovered;
  // const historicalRecoveredArray = Object.entries(historicalRecovered).map(([value, id]) => ({Date: value, type: 'Confirmed', value: historicalRecovered[value]}));
  //
  // const historicalDeaths = historicalStats.timeline.deaths;
  // const historicalDeathsArray = Object.entries(historicalDeaths).map(([value, id]) => ({Date: value, type: 'Confirmed', value: historicalDeaths[value]}));

  // const historicalActiveArray = Object.entries(historicalConfirmed).map(([value, id  ]) => ({Date: value, type: 'Active', value: historicalConfirmed[value]-historicalDeaths[value]-historicalRecovered[value]}));

  const timelineConfirmed = historicalConfirmedArray.filter(function (data, index) {

    let itemTime = new Date(data.Date).getTime();
    let filterTime = new Date('3/7/20').getTime();
    return itemTime >= filterTime ;
  });

  const timelineRecovered = historicalRecoveredArray.filter(function (data, index) {

    let itemTime = new Date(data.Date).getTime();
    let filterTime = new Date('3/7/20').getTime();
    return itemTime >= filterTime ;
  });


  const timelineDeaths = historicalDeathsArray.filter(function (data, index) {

    let itemTime = new Date(data.Date).getTime();
    let filterTime = new Date('3/7/20').getTime();
    return itemTime >= filterTime ;
  });

  const timelineActive = historicalActiveArray.filter(function (data, index) {

    let itemTime = new Date(data.Date).getTime();
    let filterTime = new Date('2020/03/07').getTime();
    return itemTime >= filterTime ;
  });


  // const todayCases = todayStats.todayCases;
  // const todayDeaths = todayStats.todayDeaths;
  const active = stats.confirmed.value - stats.deaths.value - stats.recovered.value;
  const arrayLastDate = new Date(historicalConfirmedArray[historicalConfirmedArray.length - 1].Date).getDate();

  let todayConfirmedNew = 0;
  let todayRecoveredNew = 0;
  let todayDeathsNew = 0;
  let todayActiveNew = 0;

  let yesterdayConfirmed = 0;
  let yesterdayRecovered= 0;
  let yesterdayDeaths = 0;
  let yesterdayActive = 0;

  let lastThreeDayConfirmed = 0;
  let lastThreeDayRecovered= 0;
  let lastThreeDayDeaths = 0;
  let lastThreeDayActive = 0;

  let lastSevenDayConfirmed = 0;
  let lastSevenDayRecovered= 0;
  let lastSevenDayDeaths = 0;
  let lastSevenDayActive = 0;

  let lastThirtyDayConfirmed = 0;
  let lastThirtyDayRecovered= 0;
  let lastThirtyDayDeaths = 0;
  let lastThirtyDayActive = 0;

  let tempConfirmedData = 0;
  let tempRecoveredData = 0;
  let tempDeathsData = 0;
  let tempActiveData = 0;

  if (todayDate > arrayLastDate){
    todayConfirmedNew = stats.confirmed.value - historicalConfirmedArray[historicalConfirmedArray.length - 1].value;
    todayRecoveredNew = stats.recovered.value - historicalRecoveredArray[historicalConfirmedArray.length - 1].value;
    todayDeathsNew = stats.deaths.value - historicalDeathsArray[historicalConfirmedArray.length - 1].value;
    todayActiveNew = active - historicalActiveArray[historicalConfirmedArray.length - 1].value;

    yesterdayConfirmed = historicalConfirmedArray[historicalConfirmedArray.length - 1].value - historicalConfirmedArray[historicalConfirmedArray.length - 2].value;
    yesterdayRecovered = historicalRecoveredArray[historicalConfirmedArray.length - 1].value - historicalRecoveredArray[historicalConfirmedArray.length - 2].value;
    yesterdayDeaths = historicalDeathsArray[historicalConfirmedArray.length - 1].value - historicalDeathsArray[historicalConfirmedArray.length - 2].value;
    yesterdayActive = historicalActiveArray[historicalConfirmedArray.length - 1].value - historicalActiveArray[historicalConfirmedArray.length - 2].value;

    const arraySize = historicalConfirmedArray.length - 1 ;
    let startIndex = historicalConfirmedArray.length - 3 ;

    /* Last 3 Days */
    for (let x = startIndex; x <= arraySize; x++)   {
      tempConfirmedData = Math.abs(historicalConfirmedArray[x].value - historicalConfirmedArray[x-1].value);
      tempRecoveredData = Math.abs(historicalRecoveredArray[x].value - historicalRecoveredArray[x-1].value);
      tempDeathsData = Math.abs(historicalDeathsArray[x].value - historicalDeathsArray[x-1].value);
      tempActiveData = Math.abs(historicalActiveArray[x].value - historicalActiveArray[x-1].value);

      lastThreeDayConfirmed  += tempConfirmedData;
      lastThreeDayRecovered += tempRecoveredData;
      lastThreeDayDeaths += tempDeathsData;
      lastThreeDayActive += + tempActiveData;
    }

    startIndex = historicalConfirmedArray.length - 7;
    /*Last 7 Days*/
    for (let x = startIndex; x <= arraySize; x++)   {
      tempConfirmedData = Math.abs(parseInt(historicalConfirmedArray[x].value) - parseInt(historicalConfirmedArray[x-1].value));
      tempRecoveredData = Math.abs(parseInt(historicalRecoveredArray[x].value) - parseInt(historicalRecoveredArray[x-1].value));
      tempDeathsData = Math.abs(parseInt(historicalDeathsArray[x].value) - parseInt(historicalDeathsArray[x-1].value));
      tempActiveData = Math.abs(parseInt(historicalActiveArray[x].value) - parseInt(historicalActiveArray[x-1].value));


      lastSevenDayConfirmed  += tempConfirmedData;
      lastSevenDayRecovered += tempRecoveredData;
      lastSevenDayDeaths += tempDeathsData;
      lastSevenDayActive += + tempActiveData;
    }

    startIndex = historicalConfirmedArray.length - 30;
    /* Last 30 Days */
    for (let x = startIndex; x <= arraySize; x++)   {
      tempConfirmedData = Math.abs(parseInt(historicalConfirmedArray[x].value) - parseInt(historicalConfirmedArray[x-1].value));
      tempRecoveredData = Math.abs(parseInt(historicalRecoveredArray[x].value) - parseInt(historicalRecoveredArray[x-1].value));
      tempDeathsData = Math.abs(parseInt(historicalDeathsArray[x].value) - parseInt(historicalDeathsArray[x-1].value));
      tempActiveData = Math.abs(parseInt(historicalActiveArray[x].value) - parseInt(historicalActiveArray[x-1].value));


      lastThirtyDayConfirmed  += tempConfirmedData;
      lastThirtyDayRecovered += tempRecoveredData;
      lastThirtyDayDeaths += tempDeathsData;
      lastThirtyDayActive += + tempActiveData;

    }



  }
  else{
    todayConfirmedNew = '0';
    todayRecoveredNew = '0';
    todayDeathsNew = '0';
    todayActiveNew = '0';

    yesterdayConfirmed = historicalConfirmedArray[historicalConfirmedArray.length - 2].value - historicalConfirmedArray[historicalConfirmedArray.length - 3].value;
    yesterdayRecovered = historicalRecoveredArray[historicalConfirmedArray.length - 2].value - historicalRecoveredArray[historicalConfirmedArray.length - 3].value;
    yesterdayDeaths = historicalDeathsArray[historicalConfirmedArray.length - 2].value - historicalDeathsArray[historicalConfirmedArray.length - 3].value;
    yesterdayActive = historicalActiveArray[historicalConfirmedArray.length - 2].value - historicalActiveArray[historicalConfirmedArray.length - 3].value;

    const arraySize = historicalConfirmedArray.length - 2 ;


    /* Last 3 Days */
    let startIndex = historicalConfirmedArray.length - 4;
    for (let x = startIndex; x < arraySize; x++){
      tempConfirmedData = Math.abs(parseInt(historicalConfirmedArray[x].value) - parseInt(historicalConfirmedArray[x-1].value));
      tempRecoveredData = Math.abs(parseInt(historicalRecoveredArray[x].value) - parseInt(historicalRecoveredArray[x-1].value));
      tempDeathsData = Math.abs(parseInt(historicalDeathsArray[x].value) - parseInt(historicalDeathsArray[x-1].value));
      tempActiveData = Math.abs(parseInt(historicalActiveArray[x].value) - parseInt(historicalActiveArray[x-1].value));

      lastThreeDayConfirmed  += tempConfirmedData;
      lastThreeDayRecovered += tempRecoveredData;
      lastThreeDayDeaths += tempDeathsData;
      lastThreeDayActive += + tempActiveData;
    }

    /* Last 7 Days */

    startIndex = historicalConfirmedArray.length - 8;
    for (let x = startIndex; x < arraySize; x++){
      tempConfirmedData = Math.abs(parseInt(historicalConfirmedArray[x].value) - parseInt(historicalConfirmedArray[x-1].value));
      tempRecoveredData = Math.abs(parseInt(historicalRecoveredArray[x].value) - parseInt(historicalRecoveredArray[x-1].value));
      tempDeathsData = Math.abs(parseInt(historicalDeathsArray[x].value) - parseInt(historicalDeathsArray[x-1].value));
      tempActiveData = Math.abs(parseInt(historicalActiveArray[x].value) - parseInt(historicalActiveArray[x-1].value));


      lastSevenDayConfirmed  += tempConfirmedData;
      lastSevenDayRecovered += tempRecoveredData;
      lastSevenDayDeaths += tempDeathsData;
      lastSevenDayActive += + tempActiveData;

    }

    /* Last 30 Days */
    startIndex = historicalConfirmedArray.length - 31;
    for (let x = startIndex; x < arraySize; x++){
      tempConfirmedData = Math.abs(parseInt(historicalConfirmedArray[x].value) - parseInt(historicalConfirmedArray[x-1].value));
      tempRecoveredData = Math.abs(parseInt(historicalRecoveredArray[x].value) - parseInt(historicalRecoveredArray[x-1].value));
      tempDeathsData = Math.abs(parseInt(historicalDeathsArray[x].value) - parseInt(historicalDeathsArray[x-1].value));
      tempActiveData = Math.abs(parseInt(historicalActiveArray[x].value) - parseInt(historicalActiveArray[x-1].value));


      lastThirtyDayConfirmed  += tempConfirmedData;
      lastThirtyDayRecovered += tempRecoveredData;
      lastThirtyDayDeaths += tempDeathsData;
      lastThirtyDayActive += + tempActiveData;

    }


  }

  return (
    <PageHeaderWrapper>


      <Row type='flex' gutter={responsiveGutter}>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <Card >
            <Row>
              <Col span={12}>
                <Statistic
                  title="Infected"
                  value={stats.confirmed.value}
                  valueStyle={{ color: 'orange', fontSize: 28 }}
                />
              </Col>

              <Col span={12}>
                <Statistic
                  title="First Reported"
                  value="8 March"
                  valueStyle={{ color: 'orange', fontSize: 28 }}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <CardAreaChart data={timelineConfirmed} color={'orange'}/>
              </Col>

            </Row>


            <Divider ></Divider>

            <Row>
              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Today </Text>
              </Col>

              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{todayConfirmedNew}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Yesterday</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{yesterdayConfirmed}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 3 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastThreeDayConfirmed}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 7 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastSevenDayConfirmed}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 30 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastThirtyDayConfirmed}</Text>
              </Col>

            </Row>


          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <Card>

            <Row>
              <Col span={12}>
                <div>
                  <Statistic
                    title="Active"
                    value={active}
                    valueStyle={{ color: 'grey', fontSize: 28 }}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <CardAreaChart data={timelineActive} color={'grey'}/>
              </Col>

            </Row>


            <Divider></Divider>

            <Row>
              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Today</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{todayActiveNew}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Yesterday</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{yesterdayActive}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 3 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastThreeDayActive}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 7 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastSevenDayActive}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 30 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastThirtyDayActive}</Text>
              </Col>

            </Row>
          </Card>


        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <Card>

            <Row>
              <Col span={12}>
                <div>
                  <Statistic
                    title="Recovered"
                    value={stats.recovered.value}
                    valueStyle={{ color: 'green', fontSize: 28 }}
                  />
                </div>
              </Col>

              <Col>
                <div span={12}>
                  <Statistic
                    title="Recoverey Rate"
                    value={`${((stats.recovered.value / stats.confirmed.value) * 100).toFixed(2)} %`}
                    valueStyle={{ color: 'green', fontSize: 28 }}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <CardAreaChart data={timelineRecovered} color={'green'}/>
              </Col>

            </Row>

            <Divider></Divider>

            <Row>
              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Today</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{todayRecoveredNew}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Yesterday</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{yesterdayRecovered}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 3 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastThreeDayRecovered}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 7 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastSevenDayRecovered}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 30 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastThirtyDayRecovered}</Text>
              </Col>




            </Row>

          </Card>
        </Col>


        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
          <Card>

            <Row>
              <Col span={12}>
                <div>
                  <Statistic
                    title="Deaths"
                    value={stats.deaths.value}
                    valueStyle={{ color: 'red', fontSize: 28 }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <Statistic
                    title="Death Rate"
                    value={`${((stats.deaths.value / stats.confirmed.value) * 100).toFixed(2)} %`}
                    valueStyle={{ color: 'red', fontSize: 28 }}
                  />
                </div>
              </Col>
            </Row>


            <Row>
              <Col span={24}>
                <CardAreaChart data={timelineDeaths} color={'red'}/>
              </Col>

            </Row>

            <Divider></Divider>

            <Row>
              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Today</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{ fontSize: 14}}>{todayDeathsNew}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Yesterday</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{yesterdayDeaths}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 3 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastThreeDayDeaths}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 7 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastSevenDayDeaths}</Text>
              </Col>

              <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <Text strong style={{fontSize: 14}}>Last 30 Days</Text>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <Text strong style={{fontSize: 14}}>{lastThirtyDayDeaths}</Text>
              </Col>
            </Row>
          </Card>


        </Col>


      </Row>
    </PageHeaderWrapper>
  );
}


export default Bangladesh;
