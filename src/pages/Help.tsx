import * as React from 'react';
import { Navbar } from '../components/Navbar';

export class HelpPage extends React.Component<{}, {}> {
  render() {
    return (
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
            <div className="columns">
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
                        <a href="#contact">Contact</a>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
              <div className="column">
                <h2 className="is-size-3" id="contact">
                  Contact
                </h2>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
