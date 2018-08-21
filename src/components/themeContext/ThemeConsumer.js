import { ThemeConsumer } from './index';

export default function({ render, props }) {
  const {
    theme,
    ...restProps,
  } = props;

  return (
    <ThemeConsumer>
      {(context) => {
        console.log(context)
        let currentTheme = context.theme;

        if (theme) {
          currentTheme = theme;
          context.loadTheme(currentTheme);
        }

        return render({ currentTheme, ...restProps });
      }}
    </ThemeConsumer>
  )
}
