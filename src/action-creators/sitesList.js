export const types = {
  setInitialState: 'sitesList/SET_INITIAL_STATE',
  selectorClicked: 'sitesList/SELECTOR_CLICKED',
  foldClick:       'sitesList/SITE_FOLD_CLICKED',
  dismissed:       'sitesList/DISMISSED'
}

export const setInitialState = (display, sites, selected, featured) => {
  return { type: types.setInitialState, display, sites, selected, featured }
}

export const onSelectorClick = selector => {
  return { type: types.selectorClicked, selector }
}

export const onFoldClick = code => {
  return { type: types.foldClick, code }
}

export const onDismiss = () => {
  return { type: types.dismissed }
}
