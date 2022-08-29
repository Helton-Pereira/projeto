import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <input data-testid="value-input" />
        <input data-testid="description-input" />
        <select data-testid="currency-input">
          { currencies.map(
            (currency, index) => (
              <option key={ index }>
                { currency }
              </option>),
          ) }
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies });

export default connect(mapStateToProps)(WalletForm);
