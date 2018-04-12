import * as React from 'react';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Home.scss';

export class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div id="home">
        <Navbar page="home" />
        <section className="hero is-fullheight is-default is-bold has-navbar-fixed-top">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-6">
                  <h1 className="title is-1">Codenames</h1>
                  <h2 className="subtitle is-3">
                    An online, advanced version of the Codenames boardgame!
                  </h2>
                  <p>
                    <Link to="/create" className="button is-medium is-success">
                      Create Game
                    </Link>
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
