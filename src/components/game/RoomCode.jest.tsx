import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { RoomCode, RoomCodeProps } from './RoomCode';
import { shallow } from 'enzyme';

describe('RoomCode', () => {
  const onClose = jest.fn();
  const defaultProps: RoomCodeProps = {
    code: '123456',
    onClose,
  };

  beforeEach(() => {
    onClose.mockReset();
  });

  it('should render correctly', () => {
    const tree = renderer.create(<RoomCode {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClose when it gets clicked', () => {
    const roomCode = shallow(<RoomCode {...defaultProps} />);
    expect(onClose).not.toHaveBeenCalled();
    roomCode.simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
