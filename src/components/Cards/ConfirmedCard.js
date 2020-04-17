import {Card, Col, Divider, Row, Statistic, Typography} from "antd";
import React from "react";
import CardAreaChart from "@/components/Graph/CardAreaChart";
import numeral from "numeral";

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
          <Text style={{fontSize: 12}}>Last 24 Hours</Text>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(todayConfirmed).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Yesterday</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(yesterdayConfirmed).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Last 3 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(lastThreeDayConfirmed).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Last 7 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(lastSevenDayConfirmed).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Last 30 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(lastThirtyDayConfirmed).format('0,0')}</Text>
        </Col>

      </Row>


    </Card>

  );

}

export default ConfirmedCard;
