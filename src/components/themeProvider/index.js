import path from 'path';
import { constructThemeClass, themeMap } from 'Components/helpers';
// TODO: provide 'theme' prop to every component via react context API

export default class ThemeProvider extends React.Component {
  state = {
    theme: 'default'
  }

  componentDidMount() {
    this.loadTheme();
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      this.loadTheme();
    }
  }

  loadTheme = () => {
    const { custom } = this.props;

    if (custom.scope) {
      this.setState({ theme: custom.scope }, () => {
        custom.asyncStyleFile();
      });

      return;
    }

    this.setState({ theme: this.props.theme }, () => {
      themeMap[this.props.theme].asyncImport();
    });
  }

  render() {
    const { theme } = this.state;
    const { children } = this.props;

    return (
      <div className={ constructThemeClass(theme, ['root']) }>
        { children }
      </div>
    )
  }
}
