import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <header>
        <Header />
        <WalletForm />
      </header>
    );
  }
}

export default connect()(Wallet);
