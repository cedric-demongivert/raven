import { RavenNode } from "../document/RavenNode"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenAllOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    for (const element of selection) {
      if (element instanceof RavenNode) {
        yield* element.all()
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

    return other instanceof RavenAllOperator
  }
}

/**
 * 
 */
export namespace RavenAllOperator {
  /**
   * 
   */
  export const INSTANCE: RavenAllOperator = new RavenAllOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): Iterable<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenAllOperator {
    return INSTANCE
  }
}