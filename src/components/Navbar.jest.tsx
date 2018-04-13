import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Navbar, NavbarProps } from './Navbar';
import { MemoryRouter } from 'react-router';

describe('<Navbar />', () => {
  const defaultProps: NavbarProps = {
    page: 'home',
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Navbar {...defaultProps} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
