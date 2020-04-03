import React, {useEffect, useRef} from "react";
import { Column } from '@antv/g2plot';
import abbreviateNumber from "@/utils/graph/abbreviateNumber";


function GlobalColumnChart({data, title, legend_visible, chart_color}) {

  const container = useRef(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const plot = new Column(container.current, {


      title: {
        visible: true,
        text: title,
      },
      // padding: [60, 10, 30, 40],
      padding: legend_visible ? [60, 10, 50, 40] : [30, 10, 50, 40],
      forceFit: true,
      data,
      xField: 'Date',
      yField: 'value',
      meta: {
        Date: {
          type: 'timeCat',
          // alias: 'Date',
        },
        value: {
          type: 'linear',
          // alias: 'Deaths',
          formatter:(v)=>{return abbreviateNumber(v)},
        },
      },
      xAxis: {
        // type: 'dateTime',
        title: {
          visible: false,
        },
        label: {
          // type: 'dateTime',
          position: 'top',
          offsetX: 6,
          offsetY: 6,
          style:{
            fill: 'rgba(0, 0, 0, 0.65)',
            stroke: '#ffffff',
            lineWidth: 2,
          },
          adjustColor: true,
          adjustPosition: true,

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

          visible: true,
          autoRotate: false,
        },
      },
      yAxis: {
        nice: true,
        title: {
          visible: false,
        },
      },
      colorField:'type',
      // color: chart_color,


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
      legend: {
        visible: legend_visible,
        position: 'top-left',
        style: legend_visible
          ? {
            paddingBottom: '10px',
          }
          : false,
      },




      interactions: [
        {
          type: 'slider',
          cfg : {
            start: 0.7,
            end: 1,
            minLimit: 0,
            maxLimit: 1,
            height: 50,
            foregroundStyle: {
              fill: chart_color,
            },
            // handlerStyle: {
            //   fill: '#CCC',
            // },
            // backgroundStyle: {
            //   fill: 'red',
            // },
            // textStyle: {
            //   fontSize: 16,
            // },
            trendCfg: {
              // smooth: true,
              // isArea: true,
              lineStyle: {
                stroke: chart_color,
              },
            }
          }
        },

      ],
    });


    //
    //   legend: {
    //     visible: legend_visible,
    //     position: 'top-left',
    //     style: legend_visible
    //       ? {
    //         paddingBottom: '10px',
    //       }
    //       : false,
    //   },
    //
    //


    plot.render();
  }, []);


  return (
    <div>
      <div ref={container}/>
    </div>
  );
}


export default GlobalColumnChart;
