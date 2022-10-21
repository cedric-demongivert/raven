import chalk from 'chalk'

import { toString } from '@cedric-demongivert/gl-tool-utils'

/**
 * 
 */
declare global {
  /**
   * 
   */
  namespace jest {
    /**
     * 
     */
    interface Matchers<R> {
      /**
       * 
       */
      toCompareTo(value: unknown): R;
    }
  }
}

/**
 * 
 */
function createNullMessage(this: jest.MatcherContext, received: null | undefined) {
  return (
    `Expected value to be an instance of Comparable but ` +
    `received ${this.utils.printReceived(received)} instead.`
  )
}

/**
 * 
 */
function createNotAnObjectMessage(this: jest.MatcherContext, received: unknown) {
  return (
    `Expected value to be an instance of Comparable but ` +
    `received an instance of ${typeof received} instead.`
  )
}

/**
 * 
 */
function createNoEqualPropertyMessage(this: jest.MatcherContext) {
  return 'Expected value to have an "equal" property.'
}

/**
 * 
 */
function createNoEqualMethodMessage(this: jest.MatcherContext, received: object) {
  return `Expected value to have an "equal" method, received an instance of ${typeof received.constructor.prototype.equals} instead.`
}

/**
 * 
 */
function createNotEqualMessage(this: jest.MatcherContext, received: unknown, expected: unknown) {
  return (
    `Expected ${chalk.red(toString(received))}\r\n   To be ${chalk.green(toString(expected))}\r\n\r\nBut there is notable differences.`
  )
}

/**
 * 
 */
function createEqualMessage(this: jest.MatcherContext, received: unknown, expected: unknown) {
  return ` Expected ${chalk.red(toString(received))}\r\n${chalk.green('Not')} to be equal to ${chalk.green(toString(expected))}.`
}

/**
 * 
 */
function hasEqualProperty(value: object): value is { equals: unknown } {
  return value.constructor.prototype.equals != null
}

/**
 * 
 */
export function toCompareTo(this: jest.MatcherContext, received: unknown, expected: unknown): jest.CustomMatcherResult {
  if (received == null) {
    return { pass: false, message: createNullMessage.bind(this, received) }
  }

  if (typeof received !== 'object') {
    return { pass: false, message: createNotAnObjectMessage.bind(this, received, expected) }
  }

  if (!hasEqualProperty(received)) {
    return { pass: false, message: createNoEqualPropertyMessage.bind(this, received, expected) }
  }

  const equals: unknown = received.equals

  if (typeof equals !== 'function') {
    return { pass: false, message: createNoEqualMethodMessage.bind(this, received, expected) }
  }

  if (!equals.call(received, expected)) {
    return { pass: false, message: createNotEqualMessage.bind(this, received, expected) }
  }

  return { pass: true, message: createEqualMessage.bind(this, received, expected) }
}

if (typeof global === 'object' && 'expect' in global) {
  expect.extend({ toCompareTo })
}