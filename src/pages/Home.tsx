import * as React from 'react';
import { Link } from 'react-router-dom';
import { SetupContainer } from '../containers/Setup';

export class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <nav className="navbar is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <strong>Codenames++</strong>
              </Link>
              <span className="navbar-burger burger" data-target="navbarMenu">
                <span />
                <span />
                <span />
              </span>
            </div>
            <div id="navbarMenu" className="navbar-menu">
              <div className="navbar-end">
                <div className="tabs is-right">
                  <ul>
                    <li className="is-active">
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <a href="#setup">Start Game</a>
                    </li>
                    <li>
                      <Link to="/join">Join Game</Link>
                    </li>
                    <li>
                      <a href="/help">Help</a>
                    </li>
                    <li>
                      <a href="https://github.com/matthewtole/codenames">
                        <i className="fa fa-github" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
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
        <section
          className="hero is-fullheight has-navbar-fixed-top"
          id="setup"
          style={{ paddingTop: '3.25rem' }}
        >
          <SetupContainer />
        </section>
      </div>
    );
  }
}
