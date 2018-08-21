import { constructThemeClass, checkCustomExists } from 'Components/helpers';
// TODO: provide 'theme' prop to every component via react context API

export default class ThemeProvider extends React.Component {
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
    currentTheme: 'default',
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
        this.setCurrentTheme(this.props.theme);
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

  setCurrentTheme = (stateName) => {
    let theme = this.state.themes[stateName] || this.state.themes['default'];

    this.setState({
      currentTheme: theme['scope']
    }, () => theme.asyncImport && theme.asyncImport());
  }

  render() {
    return (
      <div className={ constructThemeClass(this.state.currentTheme, ['root']) }>
        { this.props.children }
      </div>
    )
  }
}
