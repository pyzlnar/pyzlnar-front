// Action Creators for navbar

export const initialState = {
  showUserMenu: false,
  items: [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'About',
      hover: false,
      items: [
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
  ],
}

export const getUserItems = user => {
  const { username } = user
  return [
    { name: username,   path: '/me' },
    { name: 'Settings', path: '/me/edit' },
    { name: 'Logout',   path: '/logout' }
  ]
}

export const toggleHover = (state, which) => {
  const { items } = state
  const newItems  = items.map( item => {
    if (which === item.name) {
      return {...item, hover: !item.hover}
    } else {
      return item
    }
  })
  return { items: newItems }
}
