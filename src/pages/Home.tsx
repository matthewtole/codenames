import * as React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <section className="hero is-fullheight is-default is-bold">
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <Link className="navbar-item" to="/">
                    <strong>Codenames++</strong>
                  </Link>
                  <span
                    className="navbar-burger burger"
                    data-target="navbarMenu"
                  >
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
                          <Link to="/room">Start Game</Link>
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
          </div>
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
                    <Link
                      to="/room"
                      className="button is-medium is-info is-outlined"
                    >
                      Start Game
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="hero-foot">
            <div className="container">
              <div className="tabs is-centered">
                <ul>
                  <li>
                    <a>And this at the bottom</a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </section>
      </div>
    );
  }
}
