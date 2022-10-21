import { RavenNode } from "../document/RavenNode"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenBackwardOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    for (const element of selection) {
      if (element instanceof RavenNode) {
        yield* element.backward()
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

    return other instanceof RavenBackwardOperator
  }
}

/**
 * 
 */
export namespace RavenBackwardOperator {
  /**
   * 
   */
  export const INSTANCE: RavenBackwardOperator = new RavenBackwardOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): Iterable<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenBackwardOperator {
    return INSTANCE
  }
}