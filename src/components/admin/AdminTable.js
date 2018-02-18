import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import { CoolBox } from '../CoolBox'

class AdminTable extends React.Component {
  render() {
    return (
      <CoolBox>
        { this.props.items.map(item => this.renderItem(item)) }
      </CoolBox>
    )
  }

  renderItem(item) {
    return <span>{item.name}</span>
  }
}

export default connect()(AdminTable)
