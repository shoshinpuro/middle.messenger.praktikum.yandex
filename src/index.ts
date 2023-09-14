import Block from './core/Block';
import Chats from './pages/MyChats/index';
import Login from './pages/Login/index';
import SignUp from './pages/SignUp/index';
import ProfilePage from './pages/ProfilePreferences/index';
import EditProfile from './pages/EditProfile/index';
import Error404 from './pages/404/index';
import Error500 from './pages/500/index';
//import AllPages from './components/AllPages/index';
//import renderDOM from './utils/renderDOM';
import Router from './utils/router';
import AuthController from './controllers/authController';
import ChatController from './controllers/chatController';


enum Routes {
  Login = '/',
  Chats = 'messenger',
  SignUp = 'sign-up',
  ProfilePreferences = 'settings',
  EditProfile = 'edit-settings',
  Error404 = '404',
  Error500 = '500',
}

const router = new Router('#app');



document.addEventListener('DOMContentLoaded', async () => {
    router
        .use(Routes.Login, Login)
        .use(Routes.Chats, Chats as typeof Block)
        .use(Routes.SignUp, SignUp)
        .use(Routes.ProfilePreferences,ProfilePage as typeof Block )
        .use(Routes.EditProfile, EditProfile as typeof Block)
        .use(Routes.Error404, Error404)
        .use(Routes.Error500, Error500);
    
    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Login:
        case Routes.SignUp:
        isProtectedRoute = false;
        break;
    }
    
    try {
        await AuthController.getUser();
        await ChatController.getChats();
        router.start();
    
        if (!isProtectedRoute) {
            router.go(Routes.Chats);
        }
    } catch (e) {
        router.start();
    
        if (isProtectedRoute) {
            router.go(Routes.Login);
        }
    }
});

export default router;
/*window.addEventListener('DOMContentLoaded', () => {
    const pages = [
        { link: '/chats', label: 'Chats' },
        { link: '/login', label: 'Login' },
        { link: '/signUp', label: 'SignUp' },
        { link: '/profilePreferences', label: 'ProfilePreferences' },
        { link: '/editProfile', label: 'EditProfile' },
        { link: '/404', label: 'Error404' },
        { link: '/500', label: 'Error500' },
    ];

    const chatsPage = new Chats();
    const loginPage = new Login();
    const signUpPage = new SignUp();
    const profilePreferencesPage = new ProfilePreferences();
    const editProfilePage = new EditProfile();
    const error404Page = new Error404();
    const error500Page = new Error500();

    const allPages = new AllPages({ pages });
    renderDOM(allPages, '#nav');
    switch (window.location.pathname) {
        case '/chats':
            renderDOM(chatsPage);
            break;
        case '/login':
            renderDOM(loginPage);
            break;
        case '/signUp':
            renderDOM(signUpPage);
            break;
        case '/profilePreferences':
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
            break;
    }
});*/
