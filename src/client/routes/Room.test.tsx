import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Room } from './Room';
import { Board, BoardMode } from '../components/Board';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    (
      <Room
        match={{ params: { tag: 'test-room', mode: BoardMode.Viewer } }}
        history={undefined}
      />
    ),
    div,
  );
});
