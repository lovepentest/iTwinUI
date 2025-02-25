/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

window.HTMLElement.prototype.scrollIntoView = () => {};
window.HTMLElement.prototype.scrollTo = () => {};
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

if (window.PointerEvent) {
  console.error('ERROR: patching PointerEvent is no longer necessary');
} else {
  // @ts-expect-error // eslint-disable-line @typescript-eslint/ban-ts-comment
  window.PointerEvent = window.MouseEvent;
}

afterEach(() => {
  // Cleanup tippy so it does not stay in the DOM
  document
    .querySelectorAll('[data-tippy-root]')
    .forEach((tippy) => tippy.remove());
});

global.TextEncoder = TextEncoder;
