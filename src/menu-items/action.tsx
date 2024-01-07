// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { UsergroupAddOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { UsergroupAddOutlined };

// ==============================|| MENU ITEMS - action ||============================== //

const action: NavItemType = {
    id: 'action',
    title: <FormattedMessage id="action" />,
    type: 'group',
    children: [
        {
            id: 'generate-qr',
            title: <FormattedMessage id="generate-qr" />,
            type: 'collapse',
            icon: icons.UsergroupAddOutlined,
            children: [
                {
                    id: 'agent',
                    title: <FormattedMessage id="agent" />,
                    type: 'item',
                    url: '/action/generate-qr/agent'
                },
                {
                    id: 'sub-agent',
                    title: <FormattedMessage id="sub-agent" />,
                    type: 'item',
                    url: '/action/generate-qr/sub-agent'
                },
            ]
        },
    ]
};

export default action;
