import {Card, Col, Divider, Row, Statistic, Typography} from "antd";
import CardAreaChart from "@/components/Graph/CardAreaChart";
import React from "react";

const { Text } = Typography;

function ActiveCard({data}) {
  const {latestActive, activeArray, todayActive, yesterdayActive, lastThreeDayActive, lastSevenDayActive, lastThirtyDayActive} = data;
  return(
    <Card>

      <Row>
        <Col span={12}>
          <div>
            <Statistic
              title="Active"
              value={latestActive}
              valueStyle={{ color: 'grey', fontSize: 28 }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <CardAreaChart data={activeArray} color={'grey'} tooltipAlias='Active'/>
        </Col>

      </Row>


      <Divider />

      <Row>
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text strong style={{fontSize: 14}}>Today</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text strong style={{fontSize: 14}}>{todayActive}</Text>
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
  );
}


export default ActiveCard;
