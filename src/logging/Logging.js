// JavaScript source code
// xcopy /Y /S build "C:\Users\CNMIZHU7\Documents\RobotStudio\Virtual Controllers\Controller_Aprol\HOME\docs"

import React, { Component } from 'react';
import LogData from './LogData';

class Logging extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        LogData.getFileList();
        let logData = new LogData("T_ROB1");
        logData.parseFromFile();

        return (
            <div className="logging">
            </div>
        );
    }
}

export default Logging;
