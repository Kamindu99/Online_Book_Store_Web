import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import CommonLayout from 'layout/CommonLayout';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';

//book master
const List = Loadable(lazy(() => import('pages/book-management/book-master/list/List')));
const UserList = Loadable(lazy(() => import('pages/book-management/book-master/user-list/List')));
const DisposalList = Loadable(lazy(() => import('pages/book-management/disposal/list/List')));
const TransferBookList = Loadable(lazy(() => import('pages/book-management/book-transfer/list/List')));
const MyTransferBookList = Loadable(lazy(() => import('pages/book-management/my-books/list/List')));
const PastReadTransferBookList = Loadable(lazy(() => import('pages/book-management/past-read/list/List')));
const MyFavoBookList = Loadable(lazy(() => import('pages/book-management/favourite-list/favourite-books')));
const Viewbook = Loadable(lazy(() => import('pages/book-management/book-master/view/view-book')));
const OrderList = Loadable(lazy(() => import('pages/book-management/pre-order/List')));
const MyOrderList = Loadable(lazy(() => import('pages/book-management/my-orders/List')));
const SendMail = Loadable(lazy(() => import('pages/book-management/mail-sender/create')));

//user management
const ViewProfile = Loadable(lazy(() => import('pages/user-management/profile-view/ViewProfile')));
const EditProfile = Loadable(lazy(() => import('pages/user-management/profile-edit/EditProfile')));
const PasswordChange = Loadable(lazy(() => import('pages/user-management/password-change/PasswordChange')));
const QRScanner = Loadable(lazy(() => import('pages/user-management/user-scan/user-scan')));
const UsersList = Loadable(lazy(() => import('pages/user-management/all-users/List')));

//parameter management
const CategoryCode = Loadable(lazy(() => import('pages/parameter-management/category-code/List')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// render - home page
const Dashboard = Loadable(lazy(() => import('pages/home/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <MainLayout />
      ),
      children: [
        {
          path: 'home',
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />
            }
          ]
        },
        {
          path: 'book-management',
          children: [
            {
              path: 'book-master/user-list',
              element: <UserList />
            },
            {
              path: 'book-master/view-book/:id',
              element: <Viewbook />
            }
          ]
        }
      ]
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'home',
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />
            }
          ]
        },
        {
          path: 'book-management',
          children: [
            {
              path: 'book-master/list',
              element: <List />
            },
            {
              path: 'book-master/user-list',
              element: <UserList />
            },
            {
              path: 'book-master/view-book/:id',
              element: <Viewbook />
            },
            {
              path: 'book-disposal/list',
              element: <DisposalList />
            },
            {
              path: 'pre-order/list',
              element: <OrderList />
            },
            {
              path: 'pre-order/my-list',
              element: <MyOrderList />
            },
            {
              path: 'book-transfer/list',
              element: <TransferBookList />
            },
            {
              path: 'my-book-transfer/list',
              element: <MyTransferBookList />
            },
            {
              path: 'past-read-books/list',
              element: <PastReadTransferBookList />
            },
            {
              path: 'favourite',
              element: <MyFavoBookList />
            },
            {
              path: 'send-mail',
              element: <SendMail />
            }
          ]
        },
        {
          path: 'user-management',
          children: [
            {
              path: 'view-profile',
              element: <ViewProfile />
            },
            {
              path: 'edit-profile',
              element: <EditProfile />
            },
            {
              path: 'password-change',
              element: <PasswordChange />
            },
            {
              path: 'users-list',
              element: <UsersList />
            },
            {
              path: 'qr-scan',
              element: <QRScanner />
            }
          ]
        },
        {
          path: 'parameter-management',
          children: [
            {
              path: 'category-code',
              element: <CategoryCode />
            }
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
