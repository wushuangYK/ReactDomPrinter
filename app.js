import React from 'react'
import ReactDOM from 'react-dom'
import ReactDomPrinter from './lib/ReactDomPrinter'

ReactDOM.render(
    <ReactDomPrinter
        domID="toPrint"
    />,
    document.getElementById('example')
);