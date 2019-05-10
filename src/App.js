import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make", checkboxSelection: true
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true
      }, {
        headerName: "Price", field: "price", sortable: true, filter: true
      }],
     /* rowData : [{
        make: "Toyota ", model: "Celica", price: 35000
      }, {
        make: "Ford", model: "Mondeo", price: 32000
      }, {
        make: "Porsche", model: "Boxter", price: 72000
      }]*/
    }
  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/15psn9')
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
              rowData={this.state.rowData}>
          </AgGridReact>
        </div>
    );
  }
}

export default App;
