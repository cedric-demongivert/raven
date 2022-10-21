import { RavenNode } from "../document"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenNextOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    for (const element of selection) {
      if (element instanceof RavenNode && element.next) {
        yield element.next
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

    return other instanceof RavenNextOperator
  }
}

/**
 * 
 */
export namespace RavenNextOperator {
  /**
   * 
   */
  export const INSTANCE: RavenNextOperator = new RavenNextOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenNextOperator {
    return INSTANCE
  }
}