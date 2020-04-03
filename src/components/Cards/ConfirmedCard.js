import {Card, Col, Divider, Row, Statistic, Typography} from "antd";
import React from "react";
import CardAreaChart from "@/components/Graph/CardAreaChart";
const { Text } = Typography;

function ConfirmedCard({data, reportTitle, reportDate}) {

  const {latestConfirmed, confirmedArray, todayConfirmed, yesterdayConfirmed, lastThreeDayConfirmed, lastSevenDayConfirmed, lastThirtyDayConfirmed} = data;

  return(
    <Card >
      <Row>
        <Col span={12}>
          <Statistic
            title="Infected"
            value={latestConfirmed}
            valueStyle={{ color: 'orange', fontSize: 20 }}
          />
        </Col>

        <Col span={12}>
          <Statistic
            title={reportTitle}
            value={reportDate}
            valueStyle={{ color: 'orange', fontSize: 20 }}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <CardAreaChart data={confirmedArray} color="orange" tooltipAlias='Confirmed'/>
        </Col>

      </Row>


      <Divider />

      <Row>
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text strong style={{fontSize: 14}}>Today </Text>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text strong style={{fontSize: 14}}>{todayConfirmed}</Text>
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

  );

}

export default ConfirmedCard;
