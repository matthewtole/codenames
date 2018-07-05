import * as React from 'react';

export const PageHeader = ({ text }: { text: string }) => {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1">{text}</h1>
        </div>
      </div>
    </section>
  );
};
