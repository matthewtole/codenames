import * as React from 'react';

export const Loading = () => (
  <div className="modal is-active">
    <div className="modal-background" />
    <div className="modal-content has-text-centered has-text-white">
      <i className="fa fa-4x fa-spinner fa-pulse" />
    </div>
  </div>
);
