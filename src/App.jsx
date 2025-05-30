import React from 'react';

import './css/style.scss';

COMMON_FUNC(); // injected through webpack.DefinePlugin()

const App = () => {
  return <h1 className="hello">Hello again, React + Webpack + HMR!</h1>;
};

export default App;