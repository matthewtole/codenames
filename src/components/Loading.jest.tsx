import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Loading } from './Loading';

describe('<Loading />', () => {
  const defaultProps = {};

  it('renders correctly', () => {
    const tree = renderer.create(<Loading {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
