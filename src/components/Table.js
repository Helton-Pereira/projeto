import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions/index';

class Table extends Component {
  handleDelete = (e) => {
    const { dispatch, expenses } = this.props;
    const updatedExpenses = expenses.filter((expense) => expense.id !== +e.target.id);
    dispatch(deleteExpense(updatedExpenses));
    console.log(updatedExpenses);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ parseFloat(expense.value).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name}</td>
              <td>
                {
                  parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                }

              </td>
              <td>
                {
                  parseFloat(
                    expense.value
                    * expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2)
                }

              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  id={ expense.id }
                  data-testid="delete-btn"
                  onClick={ this.handleDelete }
                >
                  Deletar

                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                >
                  Editar
                </button>
              </td>
            </tr>

          )) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
