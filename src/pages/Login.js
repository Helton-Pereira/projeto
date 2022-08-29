import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const SIX = 6;

      const emailIsTrue = !email.includes('@');
      const emailIsTrue2 = !email.includes('.com');
      const passwordIsTrue = password.length < SIX;
      const buttonIsDisabled = emailIsTrue || passwordIsTrue || emailIsTrue2;

      this.setState({ isButtonDisabled: buttonIsDisabled });
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    // console.log(this.props);
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="emailInput">
          Email
          <input
            type="email"
            name="email"
            id="'emailInput"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="passwordInput">
          Senha
          <input
            type="password"
            name="password"
            id="passwordInput"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ this.handleLogin }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
