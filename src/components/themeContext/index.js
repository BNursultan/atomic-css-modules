import { constructThemeClass, checkCustomExists } from 'Components/helpers';

const ThemeContext = React.createContext();

export class ThemeProvider extends React.Component {
  state = {
    themes: {
      default: {
        scope: 'default',
        asyncImport: () => import(/* webpackChunkName: "default-theme" */ '../atomics/default')
      },
      dark: {
        scope: 'dark',
        asyncImport: () => import(/* webpackChunkName: "dark-theme" */ '../atomics/dark')
      }
    },
  }

  componentDidMount() {
    this.updateTheme();
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      this.updateTheme();
    }
  }

  updateTheme = () => {
    this.loadTheme()
      .then(() => {
        this.importTheme(this.props.theme);
      });
  }

  loadTheme = () => {
    return new Promise((resolve, reject) => {
      const {
        custom,
        includeDefault = true
      } = this.props;

      const {
        themes,
      } = this.state;

      if (includeDefault) {
        themes['default'].asyncImport();
      }

      if (custom.length === 0) {
        return resolve();
      }

      if (checkCustomExists(custom, themes)) {
        resolve();
      } else {
        const customThemes = custom.reduce((accum, curTheme, index) => {
          return Object.assign({}, accum, {
            [curTheme.scope]: curTheme
          });
        }, {});

        this.setState({
          themes: Object.assign({}, themes, customThemes)
        }, resolve);
      }
    })
  }

  importTheme = (themeName) => {
    let theme = this.state.themes[themeName] || this.state.themes['default'];

    theme.asyncImport && theme.asyncImport();
  }

  render() {
    return (
      <ThemeContext.Provider value={{
        theme: this.props.theme,
        loadTheme: this.importTheme
      }}>
        { this.props.children }
      </ThemeContext.Provider>
    )
  }
}

export const ThemeConsumer = ThemeContext.Consumer;
