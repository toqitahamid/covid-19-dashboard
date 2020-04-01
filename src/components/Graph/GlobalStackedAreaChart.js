import React, {useEffect, useRef} from "react";
import { StackedArea, Line } from '@antv/g2plot';
import {Card} from "antd";
import abbreviateNumber from "@/utils/graph/abbreviateNumber";


function GlobalStackedAreaChart({data, title}) {

  const container = useRef(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const plot = new Line(container.current, {
      title: {
        visible: true,
        text: title,
      },
      // padding: [20, 10, 30, 30],
      padding: true,
      // forceFit: true,
      data,
      meta: {

        value: {

          formatter:(v)=>{return abbreviateNumber(v)}
        }
      },
      xField: 'Date',
      yField: 'value',
      seriesField: 'type',
      // color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
      xAxis: {
        type: 'dateTime',
        mask: 'DD-MM-YYYY',
        // nice: true,
        label: {
          // 数值格式化为千分位
          formatter: (v) => {
            const dataString = new Date(v);
            const date = dataString.getDate();
            const numMonth = dataString.getMonth();

            var months = {
              '0' : 'Jan',
              '1' : 'Feb',
              '2' : 'Mar',
              '3' : 'Apr',
              '4' : 'May',
              '5' : 'Jun' ,
              '6' : 'Jul',
              '7' : 'Aug',
              '8' : 'Sep',
              '9' : 'Oct',
              '10' : 'Nov',
              '11' : 'Dec'
            };
            const month = months[numMonth];
            const formattedDate = `${date}-${month}`;

            return formattedDate;

          },

          visible: true,
          autoRotate: false,
          // autoHide: true

        },
      },
      yAxis: {
        nice: true,
      },
      axis: {
        constraint:{
          name: 'elementDist',
          option:{
            value: 4,
          },
        },
      },


      // yAxis: {
      //   label: {
      //     // 数值格式化为千分位
      //     formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      //   },
      // },
      // responsive: true,
    });

    plot.render();
  }, []);


  return (
    <div>
      <div ref={container}/>
    </div>
  );
}


export default GlobalStackedAreaChart;
