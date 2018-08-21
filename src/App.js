import { Button, ThemeProvider } from 'Components';

export default class Container extends React.Component {
  constructor(props) {
    super();

    this.state = {
      theme: 'default',
      custom: [
        // Array of custom themes
        // comment/uncomment this styles to resolve new theme
        {
          scope: 'custom', // this should be the main scope name in CSS Modules e.g. :global .[name] {}
          asyncImport: () => import(/* webpackChunkName: "custom-theme" */ './customTheme.css')
        }
      ],
    }
  }

  handleClick = () => {
    this.setState({ theme: 'custom' })
  }

  render() {
    const { custom, theme } = this.state;

    return (
      <div className="root">
        <ThemeProvider theme={ theme } custom={ custom } includeDefault={ false }>
          <Button onClick={ this.handleClick } mode="roundedDefault">Hello world!</Button>
        </ThemeProvider>
      </div>
    );
  }
}
