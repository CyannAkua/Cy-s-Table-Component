import React from 'react';
import ReactDOM from 'react-dom/client';
import Table from './lib/table'


const root = ReactDOM.createRoot(document.getElementById('root'));
let data = [{name:'cyanna'}]
let header = [{title:'Name', key:'name'}]

root.render(
  <React.StrictMode>
    <Table data={data} header={header} />
  </React.StrictMode>
);