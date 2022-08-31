import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses,
  fetchCurrencies, fetchExchangeRate } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCurrencies());
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    let { id } = this.state;
    const exchangeRates = await dispatch(fetchExchangeRate());
    dispatch(addExpenses({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    }));
    this.setState({ id: id += 1,
      description: '',
      value: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            id="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição do gasto:
          <input
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            { currencies.map(
              (currency1, index) => (
                <option
                  key={ index }
                >
                  { currency1 }
                </option>),
            ) }
          </select>
        </label>
        <label htmlFor="method-input">
          Forma de pagamento
          <select
            id="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tipo de gasto
          <select
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
