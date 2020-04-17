import {Card, Col, Divider, Row, Statistic, Typography} from "antd";
import CardAreaChart from "@/components/Graph/CardAreaChart";
import React from "react";
import numeral from "numeral";

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
              valueStyle={{ color: 'grey', fontSize: 20 }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <CardAreaChart data={activeArray} color="grey" tooltipAlias='Active'/>
        </Col>

      </Row>


      <Divider />

      <Row>
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Last 24 Hours</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
          <Text style={{fontSize: 12}}>{numeral(todayActive).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Yesterday</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(yesterdayActive).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Last 3 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(lastThreeDayActive).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Last 7 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(lastSevenDayActive).format('0,0')}</Text>
        </Col>

        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <Text style={{fontSize: 12}}>Last 30 Days</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
          <Text style={{fontSize: 12}}>{numeral(lastThirtyDayActive).format('0,0')}</Text>
        </Col>

      </Row>
    </Card>
  );
}


export default ActiveCard;
