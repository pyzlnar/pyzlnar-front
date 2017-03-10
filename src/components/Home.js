import React from 'react'

export class Home extends React.Component {
  render() {
    return (
      <div className="o-layout o-layout--reverse">
        <div className="o-layout__item u-1/1 u-1/3@tablet">
          <img className="o-thumbnail" src={'/static/img/home/side.png'} />
        </div>
        <div className="o-layout__item u-1/1 u-2/3@tablet">
          { this.renderContent() }
        </div>
      </div>
    )
  }

  renderContent() {
    return (
      <div>
        <h2>Ohaider!</h2>
        <p>Hello hello, and welcome to my site!</p>
        <p>
          If you're here, chances are that you already know me and you're just checking out the site
          because I linked it to you or you found a link in one of my profiles. If that's not the
          case... well I'm not really sure how you got here, but since you're already here feel free
          to roam around!
        </p>
        <p>
          In here you'll find a glimpse into the weirdness that lurks around in my mind, so if you plan
          to roam around, you better get used to the idea of finding some weirdness here and there.
        </p>
      </div>
    )
  }
}
