//import {Area, AreaConfig} from '@antv/g2plot';
import React, {useEffect, useRef} from 'react';
import {AreaChart} from '@opd/g2plot-react';

function CardAreaChart({data, color, tooltipAlias}) {


  const AreaConfig = {
    title: {
      visible: false,
    },
    height: 100,
    forceFit: true,
    responsive: true,
    data,
    xField: 'Date',
    yField: 'value',
    smooth: true,
    color,
    xAxis:{
      label: {
        visible: false,
      },
      grid: {
        visible: false,
      },
    },
    yAxis:{
      label: {
        visible: false,
      },
      grid: {
        visible: false,
      },
    },
    meta: {
      value: {
        alias: tooltipAlias,
      },
    },
  }



  return (
    <AreaChart {...AreaConfig} />
  )


  //
  // const container = useRef(null);
  //
  // useEffect(() => {
  //   if (!container.current) {
  //     return;
  //   }
  //
  //   const areaPlot = new Area(container.current, {
  //     title: {
  //       visible: false,
  //     },
  //     height: 100,
  //     forceFit: true,
  //     responsive: true,
  //     data,
  //     xField: 'Date',
  //     yField: 'value',
  //     smooth: true,
  //     color,
  //     xAxis:{
  //       label: {
  //         visible: false,
  //       },
  //       grid: {
  //         visible: false,
  //       },
  //     },
  //     yAxis:{
  //       label: {
  //         visible: false,
  //       },
  //       grid: {
  //         visible: false,
  //       },
  //     },
  //     meta: {
  //       value: {
  //         alias: tooltipAlias,
  //       },
  //     },
  //   });
  //   areaPlot.render();
  //
  // }, []);
  //
  //
  // return (
  //   <div style={{margin: '-28px -25px' }}>
  //     <div ref={container}/>
  //   </div>
  // );


}


export default CardAreaChart;
