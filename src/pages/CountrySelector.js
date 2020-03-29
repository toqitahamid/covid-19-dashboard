import React from 'react';
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function onChange(date, dateString) {
  console.log(date, dateString);
}

function CountrySelector() {
  return(
    <div>
      {/*<RangePicker onChange={onChange} defaultValue={[moment('2019-09-03', dateFormat), moment('2019-11-22', dateFormat)]}/>*/}
      <RangePicker onChange={onChange} />
    </div>
  );


}


export default CountrySelector;
