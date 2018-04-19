import * as React from 'react';
import { JoinContainer } from '../containers/Join';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import { COLUMNS } from '../config';
import DocumentTitle from 'react-document-title';

export class JoinPage extends React.Component<{}, {}> {
  render() {
    return (
      <DocumentTitle title="Codenames &raquo; Join Game">
        <div className="has-navbar-fixed-top">
          <Navbar page="join" />
          <div>
            <section className="hero is-primary">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title">Join Existing Game</h1>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="columns is-mobile is-multiline">
                <div className={COLUMNS.INSTRUCTIONS}>
                  <div className="box">
                    <h3 className="title is-size-4">Instructions</h3>
                    <p className="text">
                      If you haven't already, check out the{' '}
                      <Link to="/help#basics">Codenames Basics</Link> guide.
                    </p>
                    <p className="text">
                      Here is where you join an existing Codenames game. You
                      should be doing this on whatever device the rest of the
                      players will be looking at, perhaps an Amazon Fire Stick
                      or a laptop connected to a TV.
                    </p>
                    <p className="text">
                      To join a game, you'll need the six-digit code! You can
                      generate one from the game screen, detailed instructions
                      on how to do that are on the{' '}
                      <Link to="/help">Help page.</Link>
                    </p>

                    <p className="text has-text-weight-semibold">
                      Need more help? Don't fret, check out the{' '}
                      <Link to="/help">Help page</Link>.
                    </p>
                  </div>
                </div>
                <div className={COLUMNS.FORM}>
                  <JoinContainer />
                </div>
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
