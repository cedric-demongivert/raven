import chalk from 'chalk'
import { UnidocElement } from '@cedric-demongivert/unidoc'

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
      toBeSuccess(): R;
    }
  }
}


/**
 * 
 */
function createNullMessage(this: jest.MatcherContext, received: null | undefined) {
  return `Expected ${this.utils.printReceived(received)} to be ${chalk.green('defined')}.`
}

/**
 * 
 */
function createNotAnObjectMessage(this: jest.MatcherContext, received: unknown) {
  return `Expected ${this.utils.printReceived(received)} to be an ${chalk.green('object')}.`
}

/**
 * 
 */
function createIllegalTypeMessage(this: jest.MatcherContext, received: object) {
  return `Expected ${chalk.red(received.toString())} to be an instance of ${chalk.green(UnidocElement.name)}.`
}

/**
 * 
 */
function createFailureMessage(this: jest.MatcherContext, received: UnidocElement<unknown>) {
  return `Expected ${chalk.red(received.toString())} to be ${chalk.green(UnidocElement.SUCCESS.toString())}.`
}

/**
 * 
 */
function createSuccessMessage(this: jest.MatcherContext, received: UnidocElement<unknown>) {
  return `Expected ${chalk.red(received.toString())} ${chalk.green('not')} to be ${chalk.green(UnidocElement.SUCCESS.toString())}.`
}

/**
 * 
 */
export function toBeSuccess(this: jest.MatcherContext, received: unknown): jest.CustomMatcherResult {
  if (received == null) {
    return { pass: false, message: createNullMessage.bind(this, received) }
  }

  if (typeof received !== 'object') {
    return { pass: false, message: createNotAnObjectMessage.bind(this, received) }
  }

  if (!UnidocElement.is(received)) {
    return { pass: false, message: createIllegalTypeMessage.bind(this, received) }
  }

  if (received.isSuccess()) {
    return { pass: true, message: createSuccessMessage.bind(this, received) }
  } else {
    return { pass: false, message: createFailureMessage.bind(this, received) }
  }
}

if (typeof global === 'object' && 'expect' in global) {
  expect.extend({ toBeSuccess })
}