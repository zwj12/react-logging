// JavaScript source code
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Description from '@material-ui/icons/Description';

class FileList extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            fileNameList: [],
        };
    }

    componentDidMount() {
        this.getFileListFromRWS();
    }

    getFileListFromRWS() {
        let url = "/fileservice/$home/Logging?json=1"
        let request = new XMLHttpRequest();
        request.onload = () => {
            let obj = JSON.parse(request.responseText);
            let fileNameList = obj._embedded._state.map(file => file._title);
            this.setState({
                fileNameList: fileNameList
            });
        };
        request.open("GET", url);
        request.send();
    }

    render() {

        const fileNameList = this.state.fileNameList.map((fileName) => {
            return (
                <ListItem button onClick={() => this.props.handleClick(fileName)}>
                    <ListItemIcon>
                        <Description />
                    </ListItemIcon>
                    <ListItemText primary={fileName} />
                </ListItem>
            );
        });

		return (
            <div>
                <ListSubheader inset>Log Files</ListSubheader>
                {fileNameList}
            </div>
		);
	}

}

export default FileList;
