import * as React from 'react';
import { Navbar } from '../components/Navbar';
import DocumentTitle from 'react-document-title';
import { PageHeader } from '../components/PageHeader';
import { RulesetName, Team } from '../redux/game/types';
import { BoardMode } from '../components/game/Board';
import { Messages } from '../lib/message';
import './Help.scss';

export class HelpPage extends React.Component<{}, {}> {
  render() {
    return (
      <DocumentTitle title="Codenames &raquo; Help">
        <div className="has-navbar-fixed-top page--help">
          <Navbar page="help" />
          <div>
            <PageHeader text="Codenames Help" />

            <section className="hero is-light" id="introduction">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h2 className="title is-2">Introduction</h2>
                </div>
              </div>
            </section>

            <div className="section">
              <div className="container">
                <div className="columns">
                  <div className="column is-3" />
                  <div className="column is-6 has-text-justified">
                    <p className="text">
                      This is an online version of the popular board game,
                      Codenames. If you have never played Codenames before, you
                      should check out the{' '}
                      <a href="#basics">Codenames Basics</a> section below for a
                      quick overview of how it works.
                    </p>
                    <p className="text">
                      In this online version of the game, you play on two
                      screens, one for the spymasters, and one for the players.
                      We recommend a tablet or large phone for the spymasters,
                      and a TV or large computer monitor for the players. Just
                      make sure that the players cannot see the spymaster's
                      screen!
                    </p>
                    <p className="text">
                      To get started, create a game from the spymasters' screen
                      and then join that game from the players screen. You will
                      then play the game on the spymasters' screen, picking the
                      cards to reveal and passing it back and forth between the
                      red and blue team as the turn ends.
                    </p>
                    <p className="text">
                      If you want further details on any part of the process,
                      you can check out the{' '}
                      <a href="#create">Creating New Game</a>,{' '}
                      <a href="#join">Joining Existing Game</a>, or{' '}
                      <a href="#playing">Playing the Game</a> sections below.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="hero is-light" id="basics">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h2 className="title is-2">Codenames Basics</h2>
                </div>
              </div>
            </section>

            <div className="section">
              <div className="container">
                <div className="columns">
                  <div className="column is-3" />
                  <div className="column is-6 has-text-justified">
                    <p className="text">
                      Two rival spymasters know the secret identities of 25
                      agents. Their teammates know the agents only by their
                      CODENAMES. In Codenames, two teams compete to see who can
                      make contact with all of their agents first. Spymasters
                      give one-word clues that can point to multiple words on
                      the board. Their teammates try to guess words of the right
                      color while avoiding those that belong to the opposing
                      team. And everyone wants to avoid the assassin.
                    </p>
                    <p className="text">
                      Codenames: Win or lose, it's fun to figure out the clues.
                    </p>
                    <p className="text is-italic">
                      &mdash; Taken from the{' '}
                      <a
                        href="https://boardgamegeek.com/boardgame/178900/codenames"
                        target="_blank"
                        rel="nofollow"
                      >
                        Codenames page
                      </a>{' '}
                      on{' '}
                      <a
                        href="https://boardgamegeek.com"
                        target="_blank"
                        rel="nofollow"
                      >
                        Board Game Geek
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="hero is-light" id="create">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h2 className="title is-2">Creating New Game</h2>
                </div>
              </div>
            </section>

            <div className="section">
              <div className="container">
                <div className="columns">
                  <div className="column is-3" />
                  <div className="column is-6 has-text-justified">
                    <p className="text">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aperiam minima sed maiores est qui excepturi corrupti
                      reiciendis magnam ipsam ipsum officia explicabo minus
                      voluptatibus nemo ab, dignissimos perspiciatis. Fuga,
                      totam.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="hero is-light" id="join">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h2 className="title is-2">Joining Existing Game</h2>
                </div>
              </div>
            </section>

            <div className="section">
              <div className="container">
                <div className="columns">
                  <div className="column is-3" />
                  <div className="column is-6 has-text-justified">
                    <p className="text">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aperiam minima sed maiores est qui excepturi corrupti
                      reiciendis magnam ipsam ipsum officia explicabo minus
                      voluptatibus nemo ab, dignissimos perspiciatis. Fuga,
                      totam.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="hero is-light" id="faq">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h2 className="title is-2">FAQ</h2>
                </div>
              </div>
            </section>

            <div className="section">
              <div className="container">
                <div className="columns">
                  <div className="column is-3" />
                  <div className="column is-6 has-text-justified">
                    <h3 className="title is-5">
                      What are the drinking and strip rules?
                    </h3>
                    <p className="text">
                      They are custom rules that we have developed to make the
                      game a little bit more fun!
                    </p>
                    <p className="text">
                      Here are some examples of the rules:
                      <ul>
                        <li>
                          {
                            Messages.render(
                              Team.RED,
                              RulesetName.DRINKING,
                              'FRIENDLY_SPY',
                              BoardMode.VIEWER
                            ).content
                          }
                        </li>
                        <li>
                          {
                            Messages.render(
                              Team.RED,
                              RulesetName.STRIP,
                              'ENEMY_SPY',
                              BoardMode.VIEWER
                            ).content
                          }
                        </li>
                        <li>
                          {
                            Messages.render(
                              Team.RED,
                              RulesetName.DRINKING,
                              'ASSASSIN',
                              BoardMode.VIEWER
                            ).content
                          }
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="hero is-light" id="bugs">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h2 className="title is-2">Reporting Bugs</h2>
                </div>
              </div>
            </section>

            <div className="section">
              <div className="container">
                <div className="columns">
                  <div className="column is-3" />
                  <div className="column is-6 has-text-justified">
                    <p className="text">
                      The best way to report bugs is to{' '}
                      <a
                        href="https://github.com/matthewtole/codenames/issues"
                        target="_blank"
                      >
                        file an issue
                      </a>{' '}
                      on the Github reposistory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
