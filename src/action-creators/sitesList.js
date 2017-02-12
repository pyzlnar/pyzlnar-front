export const types = {
  selectorClicked: 'sitesList/SELECTOR_CLICKED'
}

export const onSelectorClick = selector => {
  return { type: types.selectorClicked, selector }
}
