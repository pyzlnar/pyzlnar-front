import { push } from 'react-router-redux';

export const onItemClick = (path) => {
  return push(path);
}

export const onMenuMouseEnter = (name) => {
  return {
    type: 'IS_ENTERING_MENU',
    name: name
  }
}

export const onMenuMouseLeave = (name) => {
  return {
    type: 'IS_LEAVING_MENU',
    name: name
  }
}
