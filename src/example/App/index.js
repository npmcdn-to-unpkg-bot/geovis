import React from 'react';
import {ThreeBulkhead} from '../../ThreeBulkhead';
import {ReactElementResize} from 'react-element-resize';


import css from './App.css';


const noop = () => null;


export const App = React.createClass({
  shouldComponentUpdate() {
    return false;
  },


  render() {
    return (
      <ReactElementResize
        className={css.app}
        debounceTimeout={50}
        onResize={noop}
        style={{position: 'fixed'}}>
        {({width, height}) => (
          <div className={css.app}>
            <ThreeBulkhead height={height} width={width} />
          </div>
        )}
      </ReactElementResize>
    );
  }
});
