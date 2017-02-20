import React from 'react'

export class Loading extends React.Component {
  render() {
    return (
      <div className='text--center'>
        <i className='fa fa-cog fa-2x fa-spin' />
        &nbsp;
        <span className='u-h3'>Loading...</span>
      </div>
    )
  }
}
