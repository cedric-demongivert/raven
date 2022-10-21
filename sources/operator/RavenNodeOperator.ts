import { RavenNode } from "../document"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenNodeOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    for (const element of selection) {
      if (element instanceof RavenNode) {
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

    return other instanceof RavenNodeOperator
  }
}

/**
 * 
 */
export namespace RavenNodeOperator {
  /**
   * 
   */
  export const INSTANCE: RavenNodeOperator = new RavenNodeOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenNodeOperator {
    return INSTANCE
  }
}