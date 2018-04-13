import { Fullscreen } from './fullscreen';

describe('Fullscreen', () => {
  const requestFullscreen = jest.fn();
  const exitFullscreen = jest.fn();

  beforeAll(() => {
    Fullscreen._window = {
      document: {
        documentElement: {
          requestFullscreen,
        },
        exitFullscreen,
      },
    };
  });

  afterAll(() => {
    Fullscreen._window = undefined;
  });

  describe('#enter', () => {
    it('should enter fullscreen', () => {
      Fullscreen.enter();
      expect(requestFullscreen).toHaveBeenCalled();
    });
  });

  describe('#leave', () => {
    it('should exit fullscreen', () => {
      Fullscreen.leave();
      expect(exitFullscreen).toHaveBeenCalled();
    });
  });
});
