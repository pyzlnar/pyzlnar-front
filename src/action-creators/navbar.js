import { push } from 'react-router-redux';

export const onClick = (path) => {
  return push(path);
}

export const onMouseEnter = (name) => {
  return {
    type: 'IS_ENTERING_MENU',
    name: name
  }
}

export const onMouseLeave = (name) => {
  return {
    type: 'IS_LEAVING_MENU',
    name: name
  }
}
