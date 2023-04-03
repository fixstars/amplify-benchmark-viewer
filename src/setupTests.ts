/* eslint-disable @typescript-eslint/no-empty-function */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = () => {}
}

HTMLCanvasElement.prototype.getContext = () => {}
