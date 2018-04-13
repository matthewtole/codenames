import * as React from 'react';
import { SetupContainer } from '../containers/Setup';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import { DictionaryNames } from '../lib/dictionary';
import { COLUMNS } from '../config';

export class CreatePage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="has-navbar-fixed-top">
        <Navbar page="create" />
        <div>
          <section className="hero is-primary">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title">Create Game</h1>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="container is-fluid">
              <div className="columns is-mobile is-multiline">
                <div className={COLUMNS.INSTRUCTIONS}>
                  <div className="box">
                    <h3 className="title is-size-4">Instructions</h3>
                    <p className="text">
                      If you haven't already, check out the{' '}
                      <Link to="/help#basics">Codenames Basics</Link> guide.
                    </p>
                    <p className="text">
                      Here is where you create a Codenames game. You should be
                      doing this on whatever device the Spymasters will be
                      using, usually a tablet or phone.
                    </p>
                    <p className="text">
                      Choose between the {DictionaryNames.length} dictionaries,
                      and then select the additional ruleset if you want to play
                      the drinking or strip versions of Codenames.{' '}
                      <em>
                        (Don't worry, you can always change your mind later on!)
                      </em>
                    </p>
                    <p className="text has-text-weight-semibold">
                      Need more help? Don't fret, check out the{' '}
                      <Link to="/help">Help page</Link>.
                    </p>
                  </div>
                </div>
                <div className={COLUMNS.FORM}>
                  <SetupContainer />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
