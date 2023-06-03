import { Chats } from '../../pages/Chats'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!;

  const chatsPage = new Chats();

  root.append(chatsPage.getContent()!);
});
