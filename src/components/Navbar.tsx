import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  page: 'home' | 'create' | 'join' | 'help';
}

export const Navbar = (props: Props) => {
  return (
    <nav className="navbar is-fixed-top is-dark">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/logo.png" width={32} height={32} className="navbar-logo" />
          <strong>Codenames</strong>
        </Link>
        <span className="navbar-burger burger" data-target="navbarMenu">
          <span />
          <span />
          <span />
        </span>
      </div>
      <div id="navbarMenu" className="navbar-menu">
        <div className="navbar-end">
          <Link
            to="/"
            className={cx({
              'navbar-item': true,
              'is-active': props.page === 'home',
            })}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={cx({
              'navbar-item': true,
              'is-active': props.page === 'create',
            })}
          >
            Create Game
          </Link>
          <Link
            to="/join"
            className={cx({
              'navbar-item': true,
              'is-active': props.page === 'join',
            })}
          >
            Join Game
          </Link>
          <Link
            to="/help"
            className={cx({
              'navbar-item': true,
              'is-active': props.page === 'help',
            })}
          >
            Help
          </Link>
          <a
            href="https://github.com/matthewtole/codenames"
            className="navbar-item"
          >
            <i className="fab fa-github" />
          </a>
        </div>
      </div>
    </nav>
  );
};
