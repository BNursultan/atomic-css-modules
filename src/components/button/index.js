import style from './style';

const Button = (props) => {
  const {
    children,
    context,
    mode,
    ...restProps
  } = props;

  return (<button type="button" className={ style[mode] } {...restProps}>{ props.children }</button>)
}

export default Button;
