import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Join, JoinProps } from './Join';
import { shallow } from 'enzyme';

describe('<Join />', () => {
  const onSubmit = jest.fn();
  const defaultProps: JoinProps = {
    onSubmit,
  };

  beforeEach(() => {
    onSubmit.mockReset();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Join {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('disables the submit button when the code is not 6 characters', () => {
    const join = shallow(<Join {...defaultProps} />);
    join.setState({ code: '' });
    expect(join.find('.button').props().disabled).toBeTruthy();

    join.setState({ code: '12345' });
    expect(join.find('.button').props().disabled).toBeTruthy();

    join.setState({ code: '123456' });
    expect(join.find('.button').props().disabled).toBeFalsy();
  });

  it('calls onSubmit when clicking button', () => {
    const join = shallow(<Join {...defaultProps} />);
    join.setState({ code: '123456' });
    join.find('.button').simulate('click');
    expect(onSubmit).toHaveBeenCalledWith('123456');
  });

  it('calls onSubmit when the form is submitted', () => {
    const join = shallow(<Join {...defaultProps} />);
    join.setState({ code: '123456' });
    join.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith('123456');
  });
});
