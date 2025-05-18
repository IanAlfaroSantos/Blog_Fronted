import { DashboardPages } from './pages/dashboard/DashboardPage';
import { Auth } from './pages/auth/Auth';
import { UserSettingsUpdate } from './pages/settings/UserSettings';
import { PublicationSave } from './pages/publications/PublicationSave';
import { UpdatePublicationPage } from './pages/publications/PublicationUpdate';
import { Comment } from './components/comments/Comment.jsx';

const routes = [
    { path: 'auth', element: <Auth /> },
    { path: '/*', element: <DashboardPages /> },
    { path: '/settings', element: <UserSettingsUpdate /> },
    { path: '/publications', element: <PublicationSave /> },
    { path: '/update-publication/:id', element: <UpdatePublicationPage /> }
]

export default routes;