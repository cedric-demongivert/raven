import { RavenNode } from "../document/RavenNode"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenForwardOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    for (const element of selection) {
      if (element instanceof RavenNode) {
        yield* element.forward()
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

    return other instanceof RavenForwardOperator
  }
}

/**
 * 
 */
export namespace RavenForwardOperator {
  /**
   * 
   */
  export const INSTANCE: RavenForwardOperator = new RavenForwardOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): Iterable<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenForwardOperator {
    return INSTANCE
  }
}