import React, {useEffect, useRef} from "react";
import {Scatter, Bubble} from '@antv/g2plot';
import abbreviateNumber from "@/utils/graph/abbreviateNumber";


function GlobalBubbleChart({data, title, label_title}) {

  const container = useRef(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const plot = new Bubble(container.current, {
      data,
      xField: 'Date',
      yField: 'value',
      sizeField: 'value',
      pointSize: [4, 25],
      colorField: 'value',
      color: ['#72302f', '#beb298', '#d18768', '#e3cda1'],
      pointStyle: {
        stroke: '#777777',
        lineWidth: 1,
        opacity: 0.9,
      },
    });

    plot.render();
  }, []);


  return (
    <div>
      <div ref={container}/>
    </div>
  );
}


export default GlobalBubbleChart;
