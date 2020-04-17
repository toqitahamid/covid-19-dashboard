import {Card, Table, Typography} from 'antd';
import React from "react";
import ReactCountryFlag from "react-country-flag"
import numeral from "numeral";
import moment from "moment";


const { Title } = Typography;

function GlobalTableCard({data, lastUpdated}) {

  data.sort(function (a, b) {
    return (b.confirmed - a.confirmed);

  });

  // countries.getAlpha2Code('United States of America', 'en'))
  const columns = [
    {
      dataIndex: 'iso2',
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
      title: 'Recovery Rate',
      dataIndex: 'recoveryRate',
      // sorter: (a, b) => a.recovered - b.recovered,
      // sortDirections: ['descend', 'ascend'],
      key: 'key',
      align: 'right',
      render:  dataFormat => numeral(dataFormat).format('0.00%'),
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
    {
      title: 'Death Rate',
      dataIndex: 'deathRate',
      key: 'key',
      // sorter: (a, b) => a.deaths - b.deaths,
      // sortDirections: ['descend', 'ascend'],
      align: 'right',
      render:  dataFormat => numeral(dataFormat).format('0.00%'),
    },

  ];

  const formatLastUpdated = moment(lastUpdated).add({hours: 6, days: 1}).format('MMMM Do YYYY, h:mm:ss a');


  return(

    <Card>
      <Title level={4}>CASES BY REGION</Title>
      <p>{`Last Updated: ${formatLastUpdated}`}</p>
      <Table dataSource={data} columns={columns} size="small" scroll={{ x: 500, y: 500 }}  tableLayout="fixed" pagination={false}/>
    </Card>


  );

}

export default GlobalTableCard
