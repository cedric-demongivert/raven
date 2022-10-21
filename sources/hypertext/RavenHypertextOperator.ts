import { RavenTag } from "../document/RavenTag"
import { RavenOperator } from "../operator/RavenOperator"

import { RavenHypertextRenderer } from "./RavenHypertextRenderer"

/**
 * 
 */
export class RavenHypertextOperator implements RavenOperator<unknown, string> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<string> {
    for (const element of selection) {
      if (RavenTag.is(element)) {
        yield RavenHypertextRenderer.renderSection(element, 0)
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

    return other instanceof RavenHypertextOperator
  }
}

/**
 * 
 */
export namespace RavenHypertextOperator {
  /**
   * 
   */
  export const INSTANCE: RavenHypertextOperator = new RavenHypertextOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<string> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenHypertextOperator {
    return INSTANCE
  }
}