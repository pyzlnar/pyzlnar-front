import React  from 'react'
import sample from 'lodash.sample'

export class NotFound extends React.Component {
  render(){
    const img = sample(['gasp', 'ruu'])
    return(
      <div className='o-layout text--center'>
        <div className='o-layout__item u-1/1'>
          <img src={ `/static/img/stickers/${img}.png` } />
        </div>
        <div className='o-layout__item u-1/1'>
          <span className='u-h4'>
            This is not the url you're looking for.
          </span>
        </div>
      </div>
    )
  }
}
