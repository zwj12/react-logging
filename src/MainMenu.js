import React from 'react';
import { connect } from "react-redux";
import { switchPage } from "./redux/actions";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" onClick={() => this.props.switchPage("Logging")} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" onClick={() => this.props.switchPage("YTCI")} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customers" onClick={() => this.props.dispatch({ type: 'SWITCH_PAGE', payload: { page: 'YTCI' } })} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Integrations" />
                </ListItem>
            </div>
        );
    }
}

const ConnectedMainMenu=connect(
    null
    , { switchPage }
)(MainMenu);

export { ConnectedMainMenu };

//export default connect(
//    null,
//    { switchPage }
//)(MainMenu);
