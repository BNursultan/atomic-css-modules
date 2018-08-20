import path from 'path';
import { Button, ThemeProvider } from 'Components';

export default class Container extends React.Component {
  constructor(props) {
    super();

    this.state = {
      theme: 'default',
      custom: {
        // comment/uncomment this styles to resolve new theme
        scope: 'custom', // this should be the main scope name in CSS Modules e.g. :global .[name] {}
        asyncStyleFile: () => import(/* webpackChunkName: "custom-theme" */ './customTheme.css')
      }
    }
  }

  componentDidMount() {
    this.setState({
      theme: this.state.theme === 'default'
        ? this.state.custom.scope || 'dark'
        : 'default'
    })
  }

  // Change theme on click
  handleClick = () => {
    this.setState({
      theme: this.state.theme === 'default'
        ? this.state.custom.scope || 'dark'
        : 'default'
    })
  }

  render() {
    const { theme, custom } = this.state;

    return (
      <ThemeProvider theme={ theme } custom={ custom }>
        <Button onClick={ this.handleClick }>Hello world!</Button>
      </ThemeProvider>
    );
  }
}
