// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { AimOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { AimOutlined };

// ==============================|| MENU ITEMS - parameter ||============================== //

const parameter: NavItemType = {
    id: 'parameter',
    title: <FormattedMessage id="parameter" />,
    type: 'group',
    children: [
        {
            id: 'agent-sub-agent-location',
            title: <FormattedMessage id="agent-sub-agent-location" />,
            type: 'item',
            url: '/parameter/agent-sub-agent-location',
            icon: icons.AimOutlined,
        }
    ]
};

export default parameter;
