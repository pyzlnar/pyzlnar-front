import React  from 'react'
import sample from 'lodash.sample'

export class About extends React.Component {
  selectImage() {
    return sample(
      ['atari', 'de', 'gasp', 'hello', 'maji', 'qmaji', 'sorena']
    )
  }

  selectContent(who) {
    switch(who) {
      case 'me':
        return this.renderAboutMe
        break
      case 'pyzlnar':
        return this.renderAboutPyzlnar
        break
      case 'site':
        return this.renderAboutSite
      default:
        const pick = sample(['me', 'pyzlnar', 'site'])
        return this.selectContent(pick)
    }
  }

  render() {
    const who     = this.props.routeParams.who
    const image   = `/static/img/stickers/${this.selectImage()}.png`
    const content = this.selectContent(who)
    return this.renderAbout(image, content)
  }

  renderAbout(image, contentRenderer) {
    return (
      <div className="o-layout o-layout--reverse">
        <div className="o-layout__item u-1/1 u-1/3@tablet">
          <img className="o-thumbnail" src={ image } />
        </div>
        <div className="o-layout__item u-1/1 u-2/3@tablet">
          { contentRenderer() }
        </div>
      </div>
    )
  }

  renderAboutMe() {
    return (
      <div>
        <h2>About: Me</h2>
        <p>
          It's actually a bit hard for me to write about myself, since I do shy away from doing so
          in the internet. Long story short, I'm a 20+ y.o. mexican, anime junkie and gamer that
          also happens to be a systems engineer.
        </p>

        <h3>Anime</h3>
        <p>
          I would be lying if I'd say that I don't take some kind of pride in the quantity of series
          I've seen. What started just out of plain curiosity while I was in high school around 10
          years ago become rapidly quite the addiction. The fact that I'm not that interested in
          traditional series for the most part probably had to do a lot to it, but here I am anyway.
        </p>
        <p>
          If you're interested on seeing how deep the rabbit hole I am, feel free to check my
          Anime Planet profile.
        </p>

        <h3>Gaming</h3>
        <p>
          When I was six days old I got Super Mario Bros 3 for NES as a Christmas present. Gaming
          has always been a part of my life, and now that I'm older I'm also part of the PC master
          race.
        </p>
        <p>
          If you want to check more of my gaming profile, feel free to check my Steam profile. Mind
          you that if you wan't to add me as a friend you better let me know beforehand as I reject
          all invites from people I don't know.
        </p>

        <h3>Programming</h3>
        <p>
          I did put programming last, but it would be a lie to say I don't enjoy programming as much
          as I love watching anime or playing games. I mean, this site as a whole is pretty much a
          programming playground, and I wouldn't have dedicated so much time to building it if I
          didn't have fun doing it.
        </p>
        <p>
          I'm a systems engineer by career, but nowadays I concentrate mostly on Ruby on Rails.
          Ruby is an awesome language to work with, and it's metaprogramming and open class make it
          such a powerful tool despite the obvious downside of being a slow language. I've even made
          a (in my opinion) pretty decent gem which you can check over here.
        </p>
        <p>
          If you want to check more about my programming skills, check out my Github profile, and
          feel free to drop in a mail if you want. Specially if you happen to be working in an
          anime project that uses Ruby or Elixir. Long shot, but might as well say it ;)
        </p>
      </div>
    )
  }

  renderAboutPyzlnar() {
    return (
      <div>
        <h2>About: Pyzlnar</h2>
        <p>
          If you haven't figured it out by now, Pyzlnar is my internet nickname.
        </p>
        <p>
          I've always liked the idea of having a name that would be available for take everywhere
          I had to register on the internet. That is, if I was posting on a forum, registering to a
          social network or simply picking a character name in an RPG or MMO I wanted to keep using
          a name that was solely (or mostly) mine.
        </p>
        <p>So it was back in 2008 when I asked a friend for help to make up a name that</p>
        <ul>
          <li>Had very little or no hits in google.</li>
          <li>Started with the letter P.</li>
          <li>Was fire related.</li>
        </ul>
        <p>And after a couple of hours later... Pyzlnar was born.</p>
        <p>
          The name itself does mean <i>'Evil Fire'</i>, and it's a mash up of three words from three
          different languages.
          Yeah, Pyzlnar was definitely created with teenager standards in mind, but I'm still very
          attached to it.
        </p>
        <ul>
          <li>Pyro: Greek for fire.</li>
          <li>Zlo:  Czech for evil.</li>
          <li>Naur: Tolkien's Elvish (Sindarin) for fire.</li>
        </ul>
        <p>I'm not sure if you can go more nerd than that, but hey here I am.</p>
        <p>
          Incidentally, Pyzlnar is pronounced <i>pile-nar</i> (silent z). Don't bite your tongue!
        </p>
      </div>
    )
  }

  renderAboutSite() {
    return (
      <div>
        <h2>About: Site</h2>
        <p>
          Fun fact: I've wanted to have my own site probably since high school. The sole fact that I
          can pay off my own domain and VPS makes me really really happy.
        </p>
        <h3>Backend</h3>
        <p>
          The public backend repo can be found here.
        </p>
        <p>
          The backend is running an API that returns information from a database. There's honestly
          nothing that exciting on the backend as of yet, but I do feel like adding cooler stuff
          later down the line.
        </p>
        <ul>
          <li>Ruby 2.4.0</li>
          <li>Rails 5.0.1</li>
          <li>Postgresql</li>
        </ul>
        <h3>Frontend</h3>
        <p>
          The public frontend repo can be found here.
        </p>
        <p>
          I'm not a front end guy, so you'll probably find stuff here and there that will more than
          likely make you raise an eyebrow. Nevertheless I think this ended up being pretty well.
          Knowing me, you will probably end up seeing refactors later down the line to keep things
          even cleaner in addition to the new features that will get added up.
        </p>
        <ul>
          <li>Yarn</li>
          <li>Webpack</li>
          <li>ES6</li>
          <li>React</li>
          <li>Redux</li>
          <li>inuitcss</li>
        </ul>
      </div>
    )
  }
}
