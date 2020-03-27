import React from "react";
import {HeartTwoTone} from "@ant-design/icons";
import {Button, Col, Row} from 'antd';
import { Anchor } from 'antd';

const { Link } = Anchor;



function MadeWithLove(){
  return (
    <div align='center'>
      <span>
        Made with <HeartTwoTone twoToneColor="#eb2f96"/> from penguin.com.bd
      </span>

    </div>
  );
}

export default MadeWithLove;
