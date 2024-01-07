import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import CommonLayout from 'layout/CommonLayout';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/change-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

// books routing
const HrUserManagementRoleCreation = Loadable(lazy(() => import('pages/book-management/books-maintains/booksList/list')))
const HrUserManagementRoleCreationCreateEditView = Loadable(lazy(() => import('pages/book-management/books-maintains/books-add-edit/create-edit-view')))
const HrUserManagementParameter = Loadable(lazy(() => import('pages/parameter/book-category/book-category')))

//dashboard routing
const AdminDashboard = Loadable(lazy(() => import('pages/dashboard/admin/home/create-edit-view')));

//maintenance routing
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: '/dashboard',
          children: [
            {
              path: 'admin',
              element: <AdminDashboard />
            }

          ]
        },
        {
          path: '/books-management',
          children: [
            {
              path: 'books',
              children: [
                {
                  path: 'books-list',
                  element: <HrUserManagementRoleCreation />
                },
                {
                  path: 'books-list/create-edit-view/:actionType/:userId',
                  element: <HrUserManagementRoleCreationCreateEditView />
                },
                {
                  path: 'parameter',
                  element: <HrUserManagementParameter />
                }
              ]
            },
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        }
      ]
    },
  ]
};

export default MainRoutes;
