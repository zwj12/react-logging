// JavaScript source code
import React, { Component } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { connect } from "react-redux";

import SpotWeld from './SpotWeld';

const columns = [
	{ field: 'id', headerName: 'Index', width: 100 },
	{ field: 'processType', headerName: 'Process', width: 130 },
	{ field: 'x', headerName: 'x', type: 'number', width: 130 },
	{ field: 'y', headerName: 'y', type: 'number', width: 130 },
	{ field: 'z', headerName: 'z', type: 'number', width: 130 },
];

//const rows = [
//	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function DataGridDemo(props) {
	let rows = props.spotWeldList.map((spotWeld, index) => {
		return (
			{ id: spotWeld.index, processType: spotWeld.getProcessTypeName(), x: spotWeld.x, y: spotWeld.y, z: spotWeld.z }
		);
	});

	return (
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
	);
}

const mapStateToProps = state => {
	return state.spotWeldData;
};

export default connect(
	mapStateToProps,
	null
)(DataGridDemo);
