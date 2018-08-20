import { button, buttonPrimary } from './style';

const Button = (props) => {
  const { children, context, ...restProps } = props;

  return (<button type="button" className={ buttonPrimary } {...restProps}>{ props.children }</button>)
}

export default Button;
