import * as React from 'react';
import { ModalMessage } from './Message';
import * as renderer from 'react-test-renderer';
import { Team } from '../../redux/game/types';
import { shallow } from 'enzyme';

describe('Message', () => {
  const onClose = jest.fn();

  const defaultProps = {
    message: {
      header: 'Message Header',
      content: 'This is the message content!',
      team: Team.BLUE,
    },
    onClose,
  };

  it('renders correctly', () => {
    const tree = renderer.create(<ModalMessage {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick when clicked', () => {
    const message = shallow(<ModalMessage {...defaultProps} />);
    message.simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
