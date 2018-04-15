import * as ReactGA from 'react-ga';
ReactGA.initialize('UA-90847686-2', {
  debug: process.env.NODE_ENV === 'development',
});

export { ReactGA };
