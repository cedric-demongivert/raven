import { Empty } from "@cedric-demongivert/gl-tool-utils"

import { RavenWord } from "../document/RavenWord"
import { RavenWhitespace } from "../document/RavenWhitespace"
import { RavenTag } from "../document/RavenTag"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
const WHITESPACE_REGEXP = /\s+/

/**
 * 
 */
const START_WHITESPACE_REGEXP = /^\s/

/**
 * 
 */
const END_WHITESPACE_REGEXP = /\s$/

/**
 * 
 */
const ALL_WHITESPACE_REGEXP = /^\s+$/

/**
 * 
 */
const ALL_TOKEN_REGEXP = /^[^\s]+$/

/**
 * 
 */
export class RavenTextOperator implements RavenOperator<unknown, string> {
  /**
   * 
   */
  public * flatten(selection: Iterable<unknown>): IterableIterator<unknown> {
    for (const element of selection) {
      if (RavenTag.is(element)) {
        yield* element.leafs()
      } else {
        yield element
      }
    }
  }

  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<string> {
    let current: string = Empty.STRING

    for (const element of this.flatten(selection)) {
      if (RavenWord.is(element)) {
        current = current.length > 0 ? current + element.content : element.content
      }

      if (RavenWhitespace.is(element)) {
        if (current.length > 0) {
          yield current
          current = Empty.STRING
        }
      }

      if (typeof element === 'string') {
        if (ALL_WHITESPACE_REGEXP.test(element)) {
          if (current.length > 0) {
            yield current
            current = Empty.STRING
          }
        } else if (ALL_TOKEN_REGEXP.test(element)) {
          current = current.length > 0 ? current + element : element
        } else {
          const tokens = element.split(WHITESPACE_REGEXP)

          if (START_WHITESPACE_REGEXP.test(element) && current.length > 0) {
            yield current
            current = Empty.STRING
          } else {
            current = current.length > 0 ? current + tokens[0] : tokens[0]
          }

          for (let index = 1; index < tokens.length; ++index) {
            yield current
            current = tokens[index]
          }

          if (END_WHITESPACE_REGEXP.test(element) && current.length > 0) {
            yield current
            current = Empty.STRING
          }
        }
      }
    }
  }

  /**
   * 
   */
  public toString(): string {
    return this.constructor.name
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    return other instanceof RavenTextOperator
  }
}

/**
 * 
 */
export namespace RavenTextOperator {
  /**
   * 
   */
  export const INSTANCE: RavenTextOperator = new RavenTextOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<string> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenTextOperator {
    return INSTANCE
  }
}