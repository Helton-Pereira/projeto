import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <header>
        <Header />
        <WalletForm />
        <Table />
      </header>
    );
  }
}

export default connect()(Wallet);
