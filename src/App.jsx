import React from 'react';

import Msg from './Msg.jsx';

import './css/style.scss';

COMMON_FUNC(); // injected through webpack.DefinePlugin()

const App = () => {
  return <>
      <h1 className="hello">Hello again, React + Webpack + HMR!</h1>
      <Msg />
    </>;
};

export default App;