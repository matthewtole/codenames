export class Fullscreen {
  private static callback: (event: Event) => void;

  static _window: any;

  static enter() {
    Fullscreen.requestFullscreen.call(Fullscreen.docElement);
  }

  static leave() {
    Fullscreen.cancelFullscreen.call(Fullscreen.doc);
  }

  static subscribe(callback: (isFullscreen: boolean) => void) {
    Fullscreen.callback = (event: Event) => {
      callback(!!Fullscreen.fullscreenElement);
    };
    Fullscreen.eventNames.forEach(name =>
      Fullscreen.doc.addEventListener(name, Fullscreen.callback)
    );
  }

  static unsubscribe() {
    Fullscreen.eventNames.forEach(name =>
      Fullscreen.doc.removeEventListener(name, Fullscreen.callback)
    );
  }

  private static get window() {
    return Fullscreen._window || window;
  }

  private static get doc() {
    return Fullscreen.window.document as any; // tslint:disable-line:no-any
  }

  private static get docElement() {
    return Fullscreen.doc.documentElement as any; // tslint:disable-line:no-any
  }

  private static get requestFullscreen() {
    return (
      Fullscreen.docElement.requestFullscreen ||
      Fullscreen.docElement.mozRequestFullScreen ||
      Fullscreen.docElement.webkitRequestFullScreen ||
      Fullscreen.docElement.msRequestFullscreen
    );
  }

  private static get cancelFullscreen() {
    return (
      Fullscreen.doc.exitFullscreen ||
      Fullscreen.doc.mozCancelFullScreen ||
      Fullscreen.doc.webkitExitFullscreen ||
      Fullscreen.doc.msExitFullscreen
    );
  }

  private static get fullscreenElement() {
    return (
      Fullscreen.doc.fullscreenElement ||
      Fullscreen.doc.mozFullScreenElement ||
      Fullscreen.doc.webkitFullscreenElement ||
      Fullscreen.doc.msFullscreenElement
    );
  }

  private static get eventNames(): string[] {
    return [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange',
    ];
  }
}
