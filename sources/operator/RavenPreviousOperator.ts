import { RavenNode } from "../document"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenPreviousOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    for (const element of selection) {
      if (element instanceof RavenNode && element.previous) {
        yield element.previous
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

    return other instanceof RavenPreviousOperator
  }
}

/**
 * 
 */
export namespace RavenPreviousOperator {
  /**
   * 
   */
  export const INSTANCE: RavenPreviousOperator = new RavenPreviousOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenPreviousOperator {
    return INSTANCE
  }
}