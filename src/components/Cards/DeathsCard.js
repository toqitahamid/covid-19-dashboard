import {Card, Col, Divider, Row, Statistic, Typography} from "antd";
import CardAreaChart from "@/components/Graph/CardAreaChart";
import React from "react";
import numeral from "numeral";

const { Text } = Typography;

function DeathsCard({data}){

  const {latestDeaths, latestConfirmed, deathsArray, todayDeaths, yesterdayDeaths, lastThreeDayDeaths, lastSevenDayDeaths, lastThirtyDayDeaths} = data;
  const deathRate = (latestDeaths/latestConfirmed) * 100;

  return(
    <Card>

      <Row>
        <Col span={12}>
          <div>
            <Statistic
              title="Deaths"
              value={latestDeaths}
              valueStyle={{ color: 'red', fontSize: 20 }}
            />
          </div>
        </Col>

        <Col span={12}>
          <div>
            <Statistic
              title="Death Rate"
              value={`${deathRate.toFixed(2)} %`}
              valueStyle={{ color: 'red', fontSize: 20 }}
            />
          </div>
        </Col>
      </Row>


      <Row>
        <Col span={24}>
          <CardAreaChart data={deathsArray} color="red" tooltipAlias='Death'/>
        </Col>

      </Row>

      <Divider />

      <Row>
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text  style={{fontSize: 12}}>Today</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text  style={{ fontSize: 12}}>{numeral(todayDeaths).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text  style={{fontSize: 12}}>Yesterday</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text  style={{fontSize: 12}}>{numeral(yesterdayDeaths).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text  style={{fontSize: 12}}>Last 3 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text  style={{fontSize: 12}}>{numeral(lastThreeDayDeaths).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text  style={{fontSize: 12}}>Last 7 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text  style={{fontSize: 12}}>{numeral(lastSevenDayDeaths).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text  style={{fontSize: 12}}>Last 30 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text  style={{fontSize: 12}}>{numeral(lastThirtyDayDeaths).format('0,0')}</Text>
        </Col>
      </Row>
    </Card>
  );
}

export default DeathsCard;
