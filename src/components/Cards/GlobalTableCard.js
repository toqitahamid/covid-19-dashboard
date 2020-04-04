import {Card, Table, Typography} from 'antd';
import React from "react";
import ReactCountryFlag from "react-country-flag"
import numeral from "numeral";


const { Title } = Typography;

function GlobalTableCard({data}) {

  data.sort(function (a, b) {
    return (b.confirmed - a.confirmed);

  });

  // countries.getAlpha2Code('United States of America', 'en'))
  const columns = [
    {
      dataIndex: 'country_code',
      key: 'key',
      width: 25,
      colSpan: 0,
      fixed: 'left',
      render:  text => <ReactCountryFlag countryCode={text} svg/>

    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'key',
      // width: 180,
      colSpan: 2,
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
      // sortOrder: 'descend',
      align: 'right',
      render:  dataFormat => numeral(dataFormat).format('0,0'),
    },
    {
      title: 'Recovered',
      dataIndex: 'recovered',
      // sorter: (a, b) => a.recovered - b.recovered,
      // sortDirections: ['descend', 'ascend'],
      key: 'key',
      align: 'right',
      render:  dataFormat => numeral(dataFormat).format('0,0'),
    },
    {
      title: 'Deaths',
      dataIndex: 'deaths',
      key: 'key',
      // sorter: (a, b) => a.deaths - b.deaths,
      // sortDirections: ['descend', 'ascend'],
      align: 'right',
      render:  dataFormat => numeral(dataFormat).format('0,0'),
    },

  ];

  return(

    <Card>
      <Title level={4}>Statistics</Title>
      <Table dataSource={data} columns={columns} size="small" scroll={{ x: 500, y: 500 }}  tableLayout="fixed" pagination={false}/>
    </Card>


  );

}

export default GlobalTableCard
