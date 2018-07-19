/**
 * Created by wushuang on 2018/7/19.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDomPrinter from 'lib/ReactDomPrinter'

ReactDOM.render(
    <ReactDomPrinter
        domID="toPrint"
    />,
    document.getElementById('example')
);
