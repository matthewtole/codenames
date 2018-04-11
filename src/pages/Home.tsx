import * as React from 'react';
import { Navbar } from '../components/Navbar';

export class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div className="has-navbar-fixed-top">
        <Navbar page="home" />
        <section className="hero is-fullheight is-default is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns is-vcentered">
                <div className="column is-5">
                  <figure className="image is-4by3">
                    <img src="/images/preview.png" alt="Description" />
                  </figure>
                </div>
                <div className="column is-6 is-offset-1">
                  <h1 className="title is-2">Codenames++</h1>
                  <h2 className="subtitle is-4">
                    An online, advanced version of the Codenames boardgame!
                  </h2>
                  <br />
                  <p className="has-text-centered">
                    <a
                      href="#setup"
                      className="button is-medium is-info is-outlined"
                    >
                      Start Game
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
