import React from 'react'

export class CoolBox extends React.Component {
  toolbarSizeClass() {
    switch(this.props.toolbarSize) {
      case 'tiny':
        return 'c-coolbox__toolbar--tiny'
        break
      case 'small':
        return 'c-coolbox__toolbar--small'
        break
      default:
        return ''
    }
  }

  render() {
    const { title, controls, children } = this.props
    return (
      <div className='c-coolbox'>
        <div className={`c-coolbox__toolbar ${this.toolbarSizeClass()}`}>
          <div className='c-coolbox__controls'>
            { controls }
          </div>
          <span className='c-coolbox__title'>
            { title }
          </span>
          <div className='c-coolbox__clear' />
        </div>
        <div className='c-coolbox_body'>
          { children }
        </div>
      </div>
    )
  }
}
