import * as React from 'react';
import { Navbar } from '../components/Navbar';
import DocumentTitle from 'react-document-title';

export class HelpPage extends React.Component<{}, {}> {
  render() {
    return (
      <DocumentTitle title="Codenames &raquo; Help">
        <div className="has-navbar-fixed-top">
          <Navbar page="help" />
          <div>
            <section className="hero is-primary">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title">Codenames Help</h1>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="container is-fluid" />
              <div className="columns is-centered">
                <div className="column is-one-quarter">
                  <div className="box">
                    <aside className="menu">
                      {/* <p className="menu-label">General</p>
                    <ul className="menu-list">
                      <li>
                        <a>Dashboard</a>
                      </li>
                      <li>
                        <a>Customers</a>
                      </li>
                    </ul> */}
                      {/* <p className="menu-label">Administration</p> */}
                      <ul className="menu-list">
                        <li>
                          <a href="#contact">Creating a Game</a>
                        </li>
                        <li>
                          <a href="#contact">Joining a Game</a>
                          <ul>
                            <li>
                              <a href="#contact">Generating a Code</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#contact">Contact</a>
                        </li>
                      </ul>
                    </aside>
                  </div>
                </div>
                <div className="column is-half">
                  <h2 className="title is-size-3">Creating a Game</h2>

                  <h2 className="title is-size-3">Joining a Game</h2>
                  <h3 className="title is-size-4">Generate a Code</h3>
                  <p className="text">
                    In order to connect a viewer to an existing game, you must
                    generate a code! You can do that from any game screen, by
                    clicking on the menu (<i className="fa fa-bars" />) and
                    choosing the <strong>Generate Room Code</strong> option.{' '}
                  </p>
                  <p className="text">
                    If you a more of a visual learning, here is a screen
                    recording of how to generate room code once you have created
                    a game.
                  </p>
                  <figure className="image">
                    <img src="/images/screencast-code.gif" />
                  </figure>
                  <p className="text" />

                  <h2 className="title is-size-3" id="contact">
                    Contact
                  </h2>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
