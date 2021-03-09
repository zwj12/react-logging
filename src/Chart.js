import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Legend} from 'recharts';
import Title from './Title';
import { connect } from "react-redux";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

//const data = [
//  createData('00:00', 0),
//  createData('03:00', 300),
//  createData('06:00', 600),
//  createData('09:00', 800),
//  createData('12:00', 1500),
//  createData('15:00', 2000),
//  createData('18:00', 2400),
//  createData('21:00', 2400),
//  createData('24:00', undefined),
//];

function Chart(props) {
    const theme = useTheme();

    let data = props.spotWeldList.map((spotWeld, index) => {
        return (
            { x: spotWeld.x, y: spotWeld.y, z: spotWeld.z}
        );
    });

    return (
        <React.Fragment>
            <Title>Spot Weld Points</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="y" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="x"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="z" stroke="#82ca9d" />
                </LineChart>

            </ResponsiveContainer>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return state.spotWeldData;
};

export default connect(
    mapStateToProps,
    null
)(Chart);
