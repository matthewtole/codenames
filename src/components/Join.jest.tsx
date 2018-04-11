import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Join, JoinProps } from './Join';

describe('<Join />', () => {
  const defaultProps: JoinProps = {
    onSubmit: jest.fn(),
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Join {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
