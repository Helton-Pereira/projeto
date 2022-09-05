import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
// import mockData from './helpers/mockData';

describe('Verifica página de login', () => {
  test('Deve haver um botão de login com texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);

    const emailButton = screen.getByRole('button', { name: /entrar/i });
    expect(emailButton).toBeInTheDocument();
    expect(emailButton).toBeDisabled();
  });
  test('Verifica a validação do botão', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, 'teste@email.com');

    const passwordInput = screen.getByText(/senha/i);
    userEvent.type(passwordInput, '147852');

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeEnabled();
  });

  test('verifica se ao clicar no botão é redirecionado para outra página', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, 'teste@email.com');

    const passwordInput = screen.getByText(/senha/i);
    userEvent.type(passwordInput, '147852');

    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);

    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(addButton).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/carteira');
  });
});

describe('Testa a página de carteira', () => {
  test('Verifica que está na página certa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(addButton).toBeInTheDocument();
  });
});
