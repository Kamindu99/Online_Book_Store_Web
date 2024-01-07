// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { FileOutlined, UserSwitchOutlined, UsergroupAddOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { FileOutlined, UsergroupAddOutlined, UserSwitchOutlined };

// ==============================|| MENU ITEMS - application ||============================== //

const application: NavItemType = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    children: [
        {
            id: 'application-requests',
            title: <FormattedMessage id="application-requests" />,
            type: 'item',
            url: '/application/application-requests',
            icon: icons.FileOutlined,
        },
        {
            id: 'customer-management',
            title: <FormattedMessage id="customer-management" />,
            type: 'collapse',
            icon: icons.UsergroupAddOutlined,
            children: [
                {
                    id: 'customers',
                    title: <FormattedMessage id="customers" />,
                    type: 'item',
                    url: '/application/customer-management/customers'
                },
            ]
        },
        {
            id: 'agent-management',
            title: <FormattedMessage id="agent-management" />,
            type: 'collapse',
            icon: icons.UserSwitchOutlined,
            children: [
                {
                    id: 'agents',
                    title: <FormattedMessage id="agents" />,
                    type: 'item',
                    url: '/application/agent-management/agents'
                },
            ]
        },
        {
            id: 'sub-agent-management',
            title: <FormattedMessage id="sub-agent-management" />,
            type: 'collapse',
            icon: icons.UserSwitchOutlined,
            children: [
                {
                    id: 'sub-agents',
                    title: <FormattedMessage id="sub-agents" />,
                    type: 'item',
                    url: '/application/sub-agent-management/sub-agents'
                },
            ]
        },
    ]
};

export default application;
