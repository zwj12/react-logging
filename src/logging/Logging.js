// JavaScript source code
// xcopy /Y /S build "C:\Users\CNMIZHU7\Documents\RobotStudio\Virtual Controllers\Controller_Aprol\HOME\docs"
// xcopy /Y /S build "C:\Users\CNMIZHU7\Documents\RobotStudio\Virtual Controllers\6700-525386-2020-12-11\HOME\docs"

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import LogData from './LogData';
import LogMessage from './LogMessage';
import FileList from './FileList';
import Dashboard from '../Dashboard';
import './Logging.css';

class Logging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            robName: "T_ROB1",
            year: 2020,
            month: 0,
            date: 4,
            messages: [],
        };
    }

    parseFromRWS(robName, year, month, date) {
        let fileDate = new Date(year, month, date);
        let url = "/fileservice/$home/Logging/" + LogMessage.dateFormat("YYYY-mm-dd", fileDate) + "_" + robName + ".log"
        let request = new XMLHttpRequest();
        request.onload = () => {
            let messages = LogData.parse(request.responseText);
            this.setState({
                robName: robName,
                year: year,
                month: month,
                date: date,
                messages: messages,
            });
        };
        request.open("GET", url);
        request.send();
    }

    handleClick(fileName) {
        let file = LogData.parseFileName(fileName);
        this.parseFromRWS(file.robName, file.year, file.month, file.date);
    }

    render() {
        return (
            <div className="Logging">
                <Dashboard
                    robName={this.state.robName}
                    year={this.state.year}
                    month={this.state.month}
                    date={this.state.date}
                    messages={this.state.messages}
                    handleClick={(fileName) => this.handleClick(fileName)}
                />
            </div>
        );
    }
}

export default Logging;
