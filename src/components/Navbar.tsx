import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router-dom';

export interface NavbarProps {
  page: 'home' | 'create' | 'join' | 'help';
}

interface State {
  isMenuOpen: boolean;
}

export class Navbar extends React.Component<NavbarProps, State> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }
  render() {
    return (
      <nav className="navbar is-fixed-top is-dark">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              src="/logo.png"
              width={32}
              height={32}
              className="navbar-logo"
            />
            <strong>Codenames</strong>
          </Link>
          <span
            className={cx({
              'navbar-burger': true,
              burger: true,
              'is-active': this.state.isMenuOpen,
            })}
            data-target="navbarMenu"
            onClick={this.closeMenu}
          >
            <span />
            <span />
            <span />
          </span>
        </div>
        <div
          id="navbarMenu"
          className={cx({
            'navbar-menu': true,
            'is-active': this.state.isMenuOpen,
          })}
        >
          <div className="navbar-end">
            <Link
              to="/"
              onClick={this.closeMenu}
              className={cx({
                'navbar-item': true,
                'is-active': this.props.page === 'home',
              })}
            >
              Home
            </Link>
            <Link
              to="/create"
              onClick={this.closeMenu}
              className={cx({
                'navbar-item': true,
                'is-active': this.props.page === 'create',
              })}
            >
              Create Game
            </Link>
            <Link
              to="/join"
              onClick={this.closeMenu}
              className={cx({
                'navbar-item': true,
                'is-active': this.props.page === 'join',
              })}
            >
              Join Game
            </Link>
            <Link
              to="/help"
              onClick={this.closeMenu}
              className={cx({
                'navbar-item': true,
                'is-active': this.props.page === 'help',
              })}
            >
              Help
            </Link>
            <a
              href="https://github.com/matthewtole/codenames"
              className="navbar-item"
              target="_blank"
              rel="nofollow"
            >
              <i className="fab fa-github" />
              <span className="is-hidden-desktop"> View on Github</span>
            </a>
          </div>
        </div>
      </nav>
    );
  }

  private closeMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }
}
