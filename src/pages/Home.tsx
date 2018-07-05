import * as React from 'react';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Home.scss';

export class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div id="home">
        <Navbar page="home" />
        <section className="hero is-dark has-navbar-fixed-top is-vcentered has-text-centered is-medium">
          <div className="hero-body">
            <h1 className="title is-1">Codenames</h1>
            <h2 className="title is-4">
              An online version of the Codenames boardgame, with drinking and
              stripping rules!
            </h2>
          </div>
        </section>
        <section className="hero is-primary has-text-centered">
          <div className="hero-body">
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <Link to="/create" className="button is-medium is-success">
                  Create New Game
                </Link>
              </p>
              <p className="control">
                <Link to="/join" className="button is-medium is-success">
                  Join Existing Game
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
