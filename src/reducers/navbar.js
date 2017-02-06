const initialState = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    hover: false,
    links: [
      {
        name: 'Me',
        path: '/about/me'
      },
      {
        name: 'Pyzlnar',
        path: '/about/pyzlnar'
      },
      {
        name: 'Site',
        path: '/about/site'
      }
    ]
  },
  {
    name: 'Sites',
    path: '/sites'
  },
  {
    name: 'Projects',
    path: '/projects'
  }
];

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'IS_ENTERING_MENU':
      return state.map((item) => toggleMenuHover(item, action));
    case 'IS_LEAVING_MENU':
      return state.map((item) => toggleMenuHover(item, action));
    default:
      return state;
  }
}

const toggleMenuHover = (item, action) => {
  if (action.name === item.name) {
    return {...item, hover: !item.hover};
  } else {
    return item;
  }
}
