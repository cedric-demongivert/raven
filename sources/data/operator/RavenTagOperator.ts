import { RavenOperator } from "../../operator/RavenOperator"
import { RavenTag } from "../RavenTag"

/**
 * 
 */
export class RavenTagOperator<Element> implements RavenOperator<Element, Element | RavenTag> {
  /**
   * 
   */
  public readonly identifier: string

  /**
   * 
   */
  public constructor(identifier: string) {
    this.identifier = identifier
  }

  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Element | RavenTag> {
    const identifier = this.identifier

    for (const element of selection) {
      if (RavenTag.is(element)) {
        if (element.tag === identifier) yield element
      } else {
        yield element
      }
    }
  }

  /**
   * 
   */
  public toString(): string {
    return `${this.constructor.name}(${this.identifier})`
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof RavenTagOperator) {
      return other.identifier === this.identifier
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenTagOperator {
  /**
   * 
   */
  export function create<Element>(identifier: string): RavenTagOperator<Element> {
    return new RavenTagOperator(identifier)
  }
}