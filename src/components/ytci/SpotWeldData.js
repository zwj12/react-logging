// JavaScript source code
import React, { Component } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { connect } from "react-redux";

import SpotWeld from './SpotWeld';
import Chart from '../../Chart';

const columns = [
	{ field: 'id', headerName: 'Index', width: 100 },
	{ field: 'processType', headerName: 'Process', width: 130 },
	{ field: 'x', headerName: 'x', type: 'number', width: 130 },
	{ field: 'y', headerName: 'y', type: 'number', width: 130 },
	{ field: 'z', headerName: 'z', type: 'number', width: 130 },
];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function SpotWeldData(props) {
	let rows = props.spotWeldList.map((spotWeld, index) => {
		return (
			{ id: spotWeld.index, processType: spotWeld.getProcessTypeName(), x: spotWeld.x, y: spotWeld.y, z: spotWeld.z }
		);
	});

	return (
		<React.Fragment>
			<div style={{ height: 500, width: '100%' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={100}
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
			</div>
			<div style={{ height: 500, width: '100%' }}>
				<Chart />
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return state.spotWeldData;
};

export default connect(
	mapStateToProps,
	null
)(SpotWeldData);
