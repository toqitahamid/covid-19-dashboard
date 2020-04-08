import React, {useEffect, useState} from "react";
import {Card, Col, Empty, Row, Select} from 'antd';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {getLatestGlobalData} from "@/utils/globalDataParser/getData";
import useStats from "../utils/useStats";
import moment from 'moment';
import 'moment/locale/en-gb'
import Selector from "@/components/Selector";
import ReactCountryFlag from "react-country-flag"
import CountryFlag from "@/components/Cards/CountryFlag";

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));


moment.locale('en-gb');

const {Option} = Select;

const responsiveGutter = [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}];




function CountrySelector() {

  const globalLatestDataCountUrl = 'https://covidapi.info/api/v1/global/latest';
  const {stats: globalLatestDataCount, loading: globalLatestDataCountLoading, error: globalLatestDataCountError} = useStats(globalLatestDataCountUrl);

  const [selectedCountry, setSelectedCountry] = useState('BGD');


  if (globalLatestDataCountLoading) return <Card active='true' loading='true'/>;
  if (!globalLatestDataCount) return <Card active='true' loading='true'/>;
  if (globalLatestDataCountError) return <Empty/>;

  // data for country table
  const globalLatestDataTotalSorted =  getLatestGlobalData(globalLatestDataCount);
  // console.log(globalLatestDataTotalSorted)



  function handleChange(e) {
    setSelectedCountry(countries.getAlpha3Code(e, 'en'));
    // console.log(`selected ${e}`);
  }



  return (
    <PageHeaderWrapper>

      <Row type='flex' gutter={responsiveGutter} >
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>

          <Select
            style={{width: 350}}
            showSearch
            defaultValue='Bangladesh'
            onChange={handleChange}
          >
            {Object.entries(globalLatestDataTotalSorted).map(([key, value]) => (
              <Option key={value.iso3 + Math.random()} value={value.country}>
                <CountryFlag iso3={value.iso3} iso2={value.iso2} />
              </Option>
            ))}


            {/*{Object.entries(globalLatestDataTotalSorted).map(([key, value]) => (*/}
            {/*  <Option key={value.iso3 + Math.random()} value={value.iso3}> {countries.getName(value.iso3, "en")} </Option>*/}
            {/*))}*/}
          </Select>

        </Col>
      </Row>

      <Row type='flex' gutter={responsiveGutter} >
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>

          <Selector iso3={selectedCountry}/>
        </Col>
      </Row>

    </PageHeaderWrapper>


  );
}

export default CountrySelector;
