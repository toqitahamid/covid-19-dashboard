import React, {useEffect, useRef} from "react";
import { Line } from '@antv/g2plot';
import abbreviateNumber from "@/utils/graph/abbreviateNumber";


function GlobalLineChart({data, title, legend_visible}) {

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
      padding: legend_visible ? [60, 15, 50, 40] : [30, 15, 50, 40],

      // forceFit: true,
      data,
      meta: {
        // Date: {
        //   type: 'cat',
        // },
        value: {
          // type: 'linear',
          formatter:(v)=>{return abbreviateNumber(v)}
        },
        // type: {
        //   type: 'cat',
        // }

      },
      xField: 'Date',
      yField: 'value',
      seriesField: 'type',
      // color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
      colorField:'type',
      color: (d) => {
        if (d === 'Confirmed'){
          return 'orange';
        }
        if (d === 'Recovered'){
          return 'green';
        }
        if (d === 'Death'){
          return 'red';
        }
        if (d === 'Active'){
          return 'grey';
        }
        //
        // return d === 'register' ? '#93D072' : '#2D71E7';
      },
      responsive: true,

      xAxis: {
        type: 'dateTime',
        mask: 'DD-MM-YYYY',
        // nice: true,
        tickCount: 21,
        subTickCount: 6,
        // tickLine: {
        //   visible: true,
        //   length: 5,
        // },

        label: {
          type: 'dateTime',
          visible: true,
          autoRotate: false,
          // autoHide: true

          formatter: (v) => {
            const dataString = new Date(v);
            const date = dataString.getDate();
            const numMonth = dataString.getMonth();

            const months = {
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
        },

      },
      yAxis: {
        nice: true,
      },
      legend: {
        visible: legend_visible,
        position: 'top-left',
        style: legend_visible
          ? {
          paddingBottom: '10px',
        }
        : false,
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


export default GlobalLineChart;
