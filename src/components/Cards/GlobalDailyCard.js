import {Card, Col, Row} from "antd";

import React from "react";
import GlobalLineChart from "@/components/Graph/GlobalLineChart";
import GlobalScatterChart from "@/components/Graph/GlobalScatterChart";
import GlobalBubbleChart from "@/components/Graph/GlobalBubbleChart";
import GlobalColumnChart from "@/components/Graph/GlobalColumnChart";


const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];

function GlobalDailyCard ({dailyTotalCaseData, dailyCaseData}){

  const {confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray} = dailyTotalCaseData;
  const dataTotalMerged = [...confirmedTotalArray, ...recoveredTotalArray, ...deathsTotalArray, ...activeTotalArray];

  const {confirmedDailyArray, recoveredDailyArray, deathsDailyArray, activeDailyArray} = dailyCaseData;
  const dailyCaseMerged = [...confirmedDailyArray, ...recoveredDailyArray, ...deathsDailyArray];



  return (


    <Row type='flex' gutter={responsiveGutter}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={dataTotalMerged} title="Total cases (worldwide)" legend_visible={true}/>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={dailyCaseMerged} title="Daily cases (worldwide)" legend_visible={true}/>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={confirmedTotalArray} title="Total confirmed (worldwide)" label_title='Total Confirmed' legend_visible={false}/>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalColumnChart  data={confirmedDailyArray} title="Daily confirmed (worldwide)" label_title='Daily Confirmed' legend_visible={false} chart_color='orange'/>
        </Card>
      </Col>

      {/*<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>*/}
      {/*  <Card>*/}
      {/*    <GlobalLineChart data={confirmedDailyArray} title="Daily confirmed (worldwide)" label_title='Daily Confirmed' legend_visible={false}/>*/}
      {/*  </Card>*/}
      {/*</Col>*/}

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={recoveredTotalArray} title="Total recovered (worldwide)" label_title='Total Recovered' legend_visible={false}/>
        </Card>
      </Col>


      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalColumnChart  data={recoveredDailyArray} title="Daily recovered (worldwide)" label_title='Daily Recovered' legend_visible={false} chart_color='green'/>
        </Card>
      </Col>

      {/*<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>*/}
      {/*  <Card>*/}
      {/*    <GlobalLineChart data={recoveredDailyArray} title="Daily recovered (worldwide)" label_title='Daily Recovered' legend_visible={false}/>*/}
      {/*  </Card>*/}
      {/*</Col>*/}

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={activeTotalArray} title="Total active (worldwide)" label_title='Total Active' legend_visible={false}/>
        </Card>
      </Col>


      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalColumnChart  data={activeDailyArray} title="Daily active (worldwide)" label_title='Daily Active' legend_visible={false} chart_color='grey'/>
        </Card>
      </Col>


      {/*<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>*/}
      {/*  <Card>*/}
      {/*    <GlobalLineChart data={activeDailyArray} title="Daily active (worldwide)" label_title='Daily Active' legend_visible={false}/>*/}
      {/*  </Card>*/}
      {/*</Col>*/}

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalLineChart data={deathsTotalArray} title="Total deaths (worldwide)" label_title='Total Deaths' legend_visible={false}/>
        </Card>
      </Col>

      {/*<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>*/}
      {/*  <Card>*/}
      {/*    <GlobalLineChart data={deathsDailyArray} title="Daily deaths (worldwide)" label_title='Daily Deaths' legend_visible={false}/>*/}
      {/*  </Card>*/}
      {/*</Col>*/}


      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalColumnChart  data={deathsDailyArray} title="Daily deaths (worldwide)" label_title='Daily Deaths' legend_visible={false} chart_color='red'/>
        </Card>
      </Col>









    </Row>


  );


}


export default GlobalDailyCard;
