import * as React from 'react';
import { Link } from 'react-router-dom';

export const Loading = ({ error }: { error?: string }) => (
  <div className="modal is-active">
    <div className="modal-background" />
    <div className="modal-content has-text-centered has-text-white">
      {error ? (
        <div>
          <i className="fa fa-4x fa-exclamation-triangle" />
          <h2 className="title is-size-3 has-text-white">{error}</h2>
          <h3 className="subtitle is-size-5">
            <Link to="/" className="has-text-light">
              &larr;Back to home
            </Link>
          </h3>
        </div>
      ) : (
        <i className="fa fa-4x fa-spinner fa-pulse" />
      )}
    </div>
  </div>
);
