import React, {useEffect, useRef} from "react";
import useStats from "../../utils/useStats";
import {Card, Empty} from 'antd';
import {Line} from '@antv/g2plot';
import abbreviateNumber from "@/utils/dateUtil/abbreviateNumber";

// const style = {background: '#fff', padding: '8px 0'};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LineChart({url, countryStats}) {


  const {stats, loading, error} = useStats(url);

  // if (!stats) return <p>Loading...</p>
  if (loading || !stats) return <Card active='true' loading='true'/>;

  if (error ) return <Empty description='No Data'/>;

  // const reportDateString = Object.entries(stats).map(([id]) => ({Date: stats[id].reportDateString, Confirmed: stats[id].totalConfirmed, Recovered: stats[id].totalRecovered}));

  const reportConfirmed = Object.entries(stats).map(([id]) => ({Date: stats[id].reportDate, type: 'Confirmed', value: stats[id].totalConfirmed}));
  const reportRecovered = Object.entries(stats).map(([id]) => ({Date: stats[id].reportDate, type: 'Recovered', value: stats[id].totalRecovered}));

  const reportData = [...reportRecovered, ...reportConfirmed];


  // const totalConfirmed = Object.entries(stats).map(([id]) => [stats[id].totalConfirmed]);

  // var person = {date: reportDateString}


  // eslint-disable-next-line no-undef
  const container = useRef(null);

  // eslint-disable-next-line no-undef
  useEffect(() => {
    if (!container.current) {
      return;
    }

    const linePlot = new Line(container.current, {
      title: {
        visible: true,
        text: 'Timeline of Confirmed & Active Cases',
      },
      description: {
        visible: false,
        text: '将数据按照某一字段进行分组，用于比对不同类型数据的趋势。',
      },
      // padding: [20, 100, 30, 80],
      padding: 'auto',
      forceFit: true,
      reportData,
      meta: {

        value: {

          formatter:(v)=>{return abbreviateNumber(v)}
        }
      },
      xField: 'Date',
      yField: 'value',
      xAxis: {
        type: 'dateTime',
        autoRotateLabel: false,
        label: {
          visible: true,
          autoHide: true,
          autoRotate: false,
        },

      },

      seriesField: 'type',
      responsive: true,

      legend: {
        visible: true,
        position:'bottom-center',
        flipPage: true,
      },

      label: {
        visible: false,
        type: 'line',
      },

      // animation: {
      //     type: 'clipingWithData',
      // },
      // smooth: true,

      color: ['#389e0d', '#D62A0D'],


    });



    linePlot.render();

  }, []);


  return (
    <div>
      <div ref={container}/>
    </div>
  );


}

export default LineChart;
