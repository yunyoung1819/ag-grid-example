import React, { Component } from 'react';
import './App.scss';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make", rowGroup: true
      },{
        headerName: "Price", field: "price"
      }],
      autoGroupColumnDef: {
        headerName: "Model",
        field: "model",
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          checkbox: true
        }
      }
    }
  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/ly7d1')
        .then(result => result.json())
        .then(rowData => this.setState({rowData}))
  }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ')
    alert('Selected nodes: ${selectedDataStringPresentation}')
  }

  render() {
    return (
        <div style={{ height: '500px', width: '600px'}} className="ag-theme-balham" >
          <button onClick={this.onButtonClick}> Get selected rows </button>
          <AgGridReact
              onGridReady={ params => this.gridApi = params.api }
              rowSelection="multiple"
              columnDefs={this.state.columnDefs}
              groupSelectsChildren={true}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              rowData={this.state.rowData}>
          </AgGridReact>
        </div>
    );
  }
}

export default App;
