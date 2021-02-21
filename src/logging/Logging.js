// JavaScript source code
// xcopy /Y /S build "C:\Users\CNMIZHU7\Documents\RobotStudio\Virtual Controllers\Controller_Aprol\HOME\docs"

import React, { Component } from 'react';

class Logging extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        function reqListener1() {
            let obj = JSON.parse(this.responseText);
            let files = obj._embedded._state;
            for (let i = 0; i < files.length; i++) {
                console.log(files[i]["_title"]);
            }
        }

        let strLogPath = "/fileservice/$home/Logging?json=1"

        let oReq1 = new XMLHttpRequest();
        oReq1.addEventListener("load", reqListener1);
        oReq1.open("GET", strLogPath);
        oReq1.send();

        function reqListener() {
            console.log(this.responseText);
        }

        //let strLogFileName = "/fileservice/$home/Logging/" + strYear + "-" + strMonth + "-" + strDate + "_" + robName + ".log"
        let strLogFileName = "/fileservice/$home/Logging/2020-01-04_T_ROB1.log"

        let oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", strLogFileName);
        oReq.send();

        return (
            <div className="logging">
            </div>
        );
    }
}

export default Logging;
