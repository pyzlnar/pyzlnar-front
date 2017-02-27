import { push } from 'react-router-redux'

export const types = {
  enteringMenu: 'navbar/ENTERING_MENU',
  leavingMenu:  'navbar/LEAVING_MENU'
}

export const onItemClick = path => {
  return push(path)
}

export const onMenuMouseEnter = name => {
  return { type: types.enteringMenu, name }
}

export const onMenuMouseLeave = name => {
  return { type: types.leavingMenu, name }
}
