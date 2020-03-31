import {Card, Col, Row} from "antd";

import React from "react";
import GlobalStackedAreaChart from "@/components/Graph/GlobalStackedAreaChart";

const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];

function GlobalDailyCard ({dailyTotalCaseData, dailyCaseData}){

  const {confirmedTotalArray, recoveredTotalArray, deathsTotalArray, activeTotalArray} = dailyTotalCaseData;


  // console.log(dailyCaseData);
  const dataTotalMerged = [...confirmedTotalArray, ...recoveredTotalArray, ...deathsTotalArray, ...activeTotalArray];
  //console.log(dataMerged);

  // console.log(dataTotalMerged);

  return (


    <Row type='flex' gutter={responsiveGutter}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalStackedAreaChart data={dataTotalMerged} title="Total cases (worldwide)"/>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>
          <GlobalStackedAreaChart data={dailyCaseData} title="Total daily cases (worldwide)"/>
        </Card>
      </Col>


    </Row>






  );


}


export default GlobalDailyCard;
