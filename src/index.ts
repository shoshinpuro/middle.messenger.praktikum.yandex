/*import { Chats } from './pages/Chats';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ProfilePreferences } from './pages/ProfilePreferences'; 
import { EditProfile } from './pages/EditProfile'; 
import { Error404 } from './pages/404'; 
import { Error500 } from './pages/500'; 
import { AllPages } from './components/AllPages';
import renderDOM from './utils/renderDOM';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')!;

  const pages = [
    { link: '/chats', label: "Chats" },
    { link: '/login', label: 'Login' },
    { link: '/signUp', label: 'SignUp' },
    { link: '/profilePreferences', label: 'ProfilePreferences' },
    { link: '/editProfile', label: 'EditProfile' },
    { link: '/404', label: 'Error404' },
    { link: '/500', label: 'Error500' }
  ]

  
  const chatsPage = new Chats();
  const loginPage = new Login();
  const signUpPage = new SignUp();
  const profilePreferencesPage = new ProfilePreferences();
  const editProfilePage = new EditProfile();
  const error404Page = new Error404();
  const error500Page = new Error500();
  const allPages = new AllPages({
    pages,
    events: {
      click: (evt) => {
        evt.preventDefault();
        const path = (evt.target! as HTMLElement).getAttribute('href');
        switch (/*window.location.pathname//path) {
          case "/chats":
            renderDOM(chatsPage);
            break;
          case "/login":
            renderDOM(loginPage);
            break;
          case "/signUp":
            renderDOM(signUpPage);
            break;
          case "/profilePreferences":
            renderDOM(profilePreferencesPage);
            break;
              case '/editProfile':
            renderDOM(editProfilePage);
            break;
          case '/404':
            renderDOM(error404Page);
            break;
          case '/500':
            renderDOM(error500Page);
            break;
          default: 
            renderDOM(allPages);
            break;
        }
      }
    }
  });


  root.append(allPages.getContent()!);
});
*/
