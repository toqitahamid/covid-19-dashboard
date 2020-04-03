import {Card, Col, Divider, Row, Statistic, Typography} from "antd";
import CardAreaChart from "@/components/Graph/CardAreaChart";
import React from "react";

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
              valueStyle={{ color: 'red', fontSize: 28 }}
            />
          </div>
        </Col>

        <Col span={12}>
          <div>
            <Statistic
              title="Death Rate"
              value={`${deathRate.toFixed(2)} %`}
              valueStyle={{ color: 'red', fontSize: 28 }}
            />
          </div>
        </Col>
      </Row>


      <Row>
        <Col span={24}>
          <CardAreaChart data={deathsArray} color={'red'} tooltipAlias='Death'/>
        </Col>

      </Row>

      <Divider />

      <Row>
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text strong style={{fontSize: 14}}>Today</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text strong style={{ fontSize: 14}}>{todayDeaths}</Text>
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
  );
}

export default DeathsCard;
