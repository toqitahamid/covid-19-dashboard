import {Card, Col, Divider, Row, Statistic, Typography} from "antd";
import React from "react";
import CardAreaChart from "@/components/Graph/CardAreaChart";

const { Text } = Typography;


function RecoveredCard({data}) {
  const {latestRecovered, latestConfirmed, recoveredArray, todayRecovered, yesterdayRecovered, lastThreeDayRecovered, lastSevenDayRecovered, lastThirtyDayRecovered} = data;

  const recoveryRate = (latestRecovered/latestConfirmed) * 100;

  return (
    <Card>

      <Row>
        <Col span={12}>
          <div>
            <Statistic
              title="Recovered"
              value={latestRecovered}
              valueStyle={{ color: 'green', fontSize: 20 }}
            />
          </div>
        </Col>

        <Col>
          <div span={12}>
            <Statistic
              title="Recoverey Rate"
              value={`${(recoveryRate).toFixed(2)} %`}
              valueStyle={{ color: 'green', fontSize: 20 }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <CardAreaChart data={recoveredArray} color="green" tooltipAlias='Recovered'/>
        </Col>

      </Row>

      <Divider />

      <Row>
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text strong style={{fontSize: 14}}>Today</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text strong style={{fontSize: 14}}>{todayRecovered}</Text>
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

  );

}

export default RecoveredCard;
