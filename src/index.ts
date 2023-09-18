import Block from './core/Block';
import Chats from './pages/MyChats/index';
import Login from './pages/Login/index';
import SignUp from './pages/SignUp/index';
import ProfilePage from './pages/ProfilePreferences/index';
import EditProfile from './pages/EditProfile/index';
import Error404 from './pages/404/index';
import Error500 from './pages/500/index';
import Router from './utils/router';
import AuthController from './controllers/authController';
import ChatController from './controllers/chatController';
import store from './utils/storeHOC';

/* enum Routes {
  Login = '/',
  Chats = 'messenger',
  SignUp = 'sign-up',
  ProfilePreferences = 'settings',
  EditProfile = 'edit-settings',
  Error404 = '404',
  Error500 = '500',
} */
export class Routes {
    public static readonly Login = '/';

    public static readonly Chats = 'messenger';

    public static readonly SignUp = 'sign-up';

    public static readonly ProfilePreferences = 'settings';

    public static readonly EditProfile = 'edit-settings';

    public static readonly Error404 = '404';

    public static readonly Error500 = '500';
}

const router = new Router('#app');

document.addEventListener('DOMContentLoaded', async () => {
    router
        .use(Routes.Login, Login)
        .use(Routes.Chats, Chats as typeof Block)
        .use(Routes.SignUp, SignUp)
        .use(Routes.ProfilePreferences, ProfilePage as typeof Block)
        .use(Routes.EditProfile, EditProfile as typeof Block)
        .use(Routes.Error404, Error404)
        .use(Routes.Error500, Error500);

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Login:
        case Routes.SignUp:
            isProtectedRoute = false;
            break;
        case Routes.Chats:
        case Routes.ProfilePreferences:
        case Routes.EditProfile:
        case Routes.Error404:
        case Routes.Error500:
            isProtectedRoute = true;
            break;
        default:
            console.log('another link'); // eslint-disable-line no-console
    }

    try {
        await AuthController.getUser();
        await ChatController.getChats();
        router.start();

        if (!isProtectedRoute && store.getState().user) {
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
