import { constructThemeClass, checkCustom } from 'Components/helpers';
// TODO: provide 'theme' prop to every component via react context API

export default class ThemeProvider extends React.Component {
  state = {
    stateMachine: {
      default: {
        scope: 'default',
        asyncImport: () => import(/* webpackChunkName: "default-theme" */ '../atomics/default')
      },
      dark: {
        scope: 'dark',
        asyncImport: () => import(/* webpackChunkName: "dark-theme" */ '../atomics/dark')
      }
    },
    currentState: 'default',
  }

  componentDidMount() {
    this.loadTheme()
      .then(() => {
        this.setCurrentTheme(this.props.theme, 'scope');
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      this.loadTheme()
        .then(() => {
          this.setCurrentTheme(this.props.theme, 'scope');
        });
    }
  }

  loadTheme = () => {
    return new Promise((resolve, reject) => {
      const {
        custom,
        theme = 'default',
        includeDefault = true
      } = this.props;

      const {
        stateMachine,
      } = this.state;

      if (includeDefault) {
        themeMap['default'].asyncImport();
      }

      if (custom.length === 0) {
        return resolve();
      }

      if (checkCustom(custom, stateMachine)) {
        console.log('Theme already exists');
        resolve();
      } else {
        const customThemes = custom.reduce((accum, curTheme, index) => {
          return Object.assign({}, accum, {
            [curTheme.scope]: curTheme
          });
        }, {});

        this.setState({
          stateMachine: Object.assign({}, stateMachine, customThemes)
        }, resolve);
      }
    })
  }

  setCurrentTheme = (stateName, action) => {
    this.setState({
      currentState: this.state.stateMachine[stateName][action]
    }, () => {
      const { asyncImport = null } = this.state.stateMachine[stateName];

      asyncImport && asyncImport();
    });
  }

  render() {
    const { currentState } = this.state;
    const { children } = this.props;

    return (
      <div className={ constructThemeClass(currentState, ['root']) }>
        { children }
      </div>
    )
  }
}
