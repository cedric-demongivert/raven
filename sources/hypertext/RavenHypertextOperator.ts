import { RavenTag } from "../data/RavenTag"
import { RavenOperator } from "../operator/RavenOperator"

import { RavenHypertextRenderer } from "./RavenHypertextRenderer"

/**
 * 
 */
export class RavenHypertextOperator<Element> implements RavenOperator<Element, Exclude<Element, RavenTag> | string> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Exclude<Element, RavenTag> | string> {
    for (const element of selection) {
      if (RavenTag.is(element)) {
        yield RavenHypertextRenderer.renderSection(element, 0)
      } else {
        yield element as Exclude<Element, RavenTag>
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
  export const INSTANCE: RavenHypertextOperator<any> = new RavenHypertextOperator()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): IterableIterator<Exclude<Element, RavenTag> | string> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenHypertextOperator<Element> {
    return INSTANCE
  }
}