import { ThemeConsumer } from 'Components';
import style from './style';

const Button = (props) => {
  return (
    <ThemeConsumer props={ props } render={
      ({
        children,
        mode,
        currentTheme,
        ...restProps
      }) => (
        <span className={ currentTheme }>
          <button type="button" className={ style[mode] } {...restProps}>{ props.children }</button>
        </span>
      )
    }/>
  )
}

export default Button;
