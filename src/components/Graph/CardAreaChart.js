import {Area} from '@antv/g2plot';
import React, {useEffect, useRef} from 'react';

function CardAreaChart({data, color}) {

  const container = useRef(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const areaPlot = new Area(container.current, {
      title: {
        visible: false,
        text: '基础面积图',
      },
      height: 100,
      forceFit: true,
      responsive: true,
      data,
      xField: 'Date',
      yField: 'value',
      smooth: true,
      color: color,
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
    });
    areaPlot.render();

  }, []);


  return (
    <div style={{margin: '-28px -25px' }}>
      <div ref={container}/>
    </div>
  );


}


export default CardAreaChart;
