import { RavenWord } from "../document/RavenWord"
import { RavenTag } from "../document/RavenTag"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
const WHITESPACES = /\s+/

/**
 * 
 */
export class RavenWordOperator implements RavenOperator<unknown, RavenWord> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenWord> {
    for (const element of selection) {
      if (RavenWord.is(element)) {
        yield element
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

    return other instanceof RavenWordOperator
  }
}

/**
 * 
 */
export namespace RavenWordOperator {
  /**
   * 
   */
  export const INSTANCE: RavenWordOperator = new RavenWordOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<RavenWord> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenWordOperator {
    return INSTANCE
  }
}