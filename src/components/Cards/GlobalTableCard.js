import {Card, Table} from 'antd';
import React from "react";

function GlobalTableCard({data}) {

  data.sort(function (a, b) {
    return (b.confirmed - a.confirmed);

  })

  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'key',
      //width: 180,
      ellipsis: true,
      fixed: 'left',
      textWrap: 'word-break',

    },
    {
      title: 'Confirmed',
      dataIndex: 'confirmed',
      key: 'key',
      // sorter: (a, b) => a.confirmed - b.confirmed,
      // sortDirections: ['descend', 'ascend'],
      //sortOrder: 'descend',
      align: 'right'
    },
    {
      title: 'Recovered',
      dataIndex: 'recovered',
      // sorter: (a, b) => a.recovered - b.recovered,
      // sortDirections: ['descend', 'ascend'],
      key: 'key',
      align: 'right'
    },
    {
      title: 'Deaths',
      dataIndex: 'deaths',
      key: 'key',
      // sorter: (a, b) => a.deaths - b.deaths,
      // sortDirections: ['descend', 'ascend'],
      align: 'right'
    },

  ];

  return(

    <Card>
      <Table dataSource={data} columns={columns} size="small" title={() => 'Statistics'} scroll={{ x: 500, y: 500 }}  tableLayout="fixed" pagination={false}/>
    </Card>


  );

}

export default GlobalTableCard
