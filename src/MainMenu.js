import React from 'react';
import { connect } from "react-redux";
import { switchPage, getSpotWeldData } from "./redux/actions";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

import SpotWeld from './components/ytci/SpotWeld';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    parseFromRWS(numIndex) {
        let url = "/rw/rapid/symbol/data/RAPID/T_ROB1/PartAModule/rProcessTargetList{" + numIndex + "}?json=1"
        let request = new XMLHttpRequest();
        request.onload = () => {
            let obj = JSON.parse(request.responseText);
            let strTarget = obj._embedded._state[0];
            let spotWeld = new SpotWeld();
            spotWeld.parse(strTarget.value);
            spotWeld.index = numIndex;
            this.props.getSpotWeldData(spotWeld);
        };
        request.open("GET", url);
        request.send();
    }

    loadSpotWeldData() {
        for (let i = 1; i <= 13; i++) {
            this.parseFromRWS(i);
        }        
        this.props.switchPage("YTCI")
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
                    <ListItemText primary="Orders" onClick={() => this.loadSpotWeldData()} />
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
    , { switchPage, getSpotWeldData }
)(MainMenu);

export { ConnectedMainMenu };

//export default connect(
//    null,
//    { switchPage }
//)(MainMenu);
