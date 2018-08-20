import path from 'path';
import { constructThemeClass, themeMap } from 'Components/helpers';
// TODO: provide 'theme' prop to every component via react context API

export default class ThemeProvider extends React.Component {
  componentDidMount() {
    this.loadTheme();
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      this.loadTheme();
    }
  }

  loadTheme = () => {
    const { custom, theme } = this.props;

    // Load default
    themeMap['default'].asyncImport();

    if (custom.scope) {
      this.setState({ theme: custom.scope }, () => {
        custom.asyncStyleFile();
      });

      return;
    }

    if (theme) {
      this.setState({ theme }, () => {
        themeMap[theme].asyncImport();
      });
    }
  }

  render() {
    const { children, theme } = this.props;

    return (
      <div className={ constructThemeClass(theme, ['root']) }>
        { children }
      </div>
    )
  }
}
