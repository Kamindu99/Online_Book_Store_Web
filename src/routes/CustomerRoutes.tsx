import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import CommonLayout from 'layout/CommonLayout';

//customer routing
const Welcome = Loadable(lazy(() => import('pages/customer/welcome')));
const PolicyFlowPolicyCatagories = Loadable(lazy(() => import('pages/customer/policy-flow/policy-categories/policy-categories')));
const PolicyFlowPolicySubCatagories = Loadable(
  lazy(() => import('pages/customer/policy-flow/policy-sub-categories/policy-sub-categories'))
);
const PolicyFlowCustomer = Loadable(lazy(() => import('pages/customer/policy-flow/policy-customer-flow/policy-customer-flow')));
const CustomerView = Loadable(lazy(() => import('pages/customer/customer-view')));

// ==============================|| CUSTOMER ROUTING ||============================== //

const CustomerRoutes = {
  path: '/',
  children: [
    {
      path: '/customer',
      element: <CommonLayout />,
      children: [
        {
          path: 'welcome',
          element: <Welcome />
        },
        {
          path: 'policy-flow/categories',
          element: <PolicyFlowPolicyCatagories />
        },
        {
          path: 'policy-flow/categories/:policyCategoryId/sub-categories',
          element: <PolicyFlowPolicySubCatagories />
        },
        {
          path: 'policy-flow/categories/:policyCategoryId/sub-categories/:policySubCategoryId/customer-flow',
          element: <PolicyFlowCustomer />
        },
        {
          path: 'customerview',
          element: <CustomerView />
        }
      ]
    }
  ]
};

export default CustomerRoutes;
