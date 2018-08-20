import './stylesheets';

import ReactDOM from 'react-dom';
import Container from './container';

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('js-root'),
  )
}

render(Container);
