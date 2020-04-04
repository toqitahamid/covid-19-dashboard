import {Card, Col, Row} from "antd";

import React from "react";
import GlobalLineChart from "@/components/Graph/GlobalLineChart";
import GlobalColumnChart from "@/components/Graph/GlobalColumnChart";


const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];

function GlobalDailyCard ({dailyTotalCaseData, dailyCaseData}){

  const {confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray} = dailyTotalCaseData;
  const dataTotalMerged = [...confirmedTotalArray, ...recoveredTotalArray, ...deathsTotalArray, ...activeTotalArray];

  console.log(dataTotalMerged);

  const {confirmedDailyArray, recoveredDailyArray, deathsDailyArray, activeDailyArray} = dailyCaseData;
  const dailyCaseMerged = [...confirmedDailyArray, ...recoveredDailyArray, ...deathsDailyArray];



  return (


    <Row type='flex' gutter={responsiveGutter}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={dataTotalMerged} title="Total cases" legend_visible/>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={dailyCaseMerged} title="Daily cases" legend_visible/>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={confirmedTotalArray} title="Total confirmed" label_title='Total Confirmed' legend_visible={false}/>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalColumnChart  data={confirmedDailyArray} title="Daily confirmed" label_title='Daily Confirmed' legend_visible={false} chart_color='orange'/>
        </Card>
      </Col>


      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={recoveredTotalArray} title="Total recovered" label_title='Total Recovered' legend_visible={false}/>
        </Card>
      </Col>


      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalColumnChart  data={recoveredDailyArray} title="Daily recovered" label_title='Daily Recovered' legend_visible={false} chart_color='green'/>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={activeTotalArray} title="Total active" label_title='Total Active' legend_visible={false}/>
        </Card>
      </Col>


      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalColumnChart  data={activeDailyArray} title="Daily active" label_title='Daily Active' legend_visible={false} chart_color='grey'/>
        </Card>
      </Col>


      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={deathsTotalArray} title="Total deaths" label_title='Total Deaths' legend_visible={false}/>
        </Card>
      </Col>


      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalColumnChart  data={deathsDailyArray} title="Daily deaths" label_title='Daily Deaths' legend_visible={false} chart_color='red'/>
        </Card>
      </Col>

    </Row>
  );
}
export default GlobalDailyCard;
