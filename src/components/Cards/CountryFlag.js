import React from "react";
import {Col, Row} from "antd";
import ReactCountryFlag from "react-country-flag";
const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));


function CountryFlag({iso3, iso2}) {
  // console.log(countries.getName(iso3, "en"))

  return (
    <>
      <Row>
        <Col flex="25px">
          <ReactCountryFlag countryCode={iso2} svg/>
        </Col>
        <Col flex="auto">
          {countries.getName(iso3, "en")}
        </Col>

      </Row>
    </>
  )
}

export default CountryFlag;
