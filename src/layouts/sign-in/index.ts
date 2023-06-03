import { Login } from '../../pages/Login'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!;

  const loginPage = new Login();

  root.append(loginPage.getContent()!);
});
