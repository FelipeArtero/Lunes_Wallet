import React from 'react';
import Tabs from '../../components/tabs';

const titles = [
  'Voucher',
  'Lunes Gift',
  'Cupom',
  "Teste 1",
  "Teste 2"
];

const contents = [
  <h1>Voucher</h1>,
  <h1>Lunes Gift</h1>,
  <h1>Cupom</h1>,
  <h1>Teste 1</h1>,
  <h1>Teste 2</h1>,
];

class Recharge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Tabs tabTitles={titles} tabContents={contents} />
      </div>
    )
  }
}

export default Recharge;
