import { RavenTag } from "../RavenTag"
import { RavenOperator } from "../../operator/RavenOperator"

/**
 * 
 */
export class RavenIdentifierOperator<Element> implements RavenOperator<Element, Element | RavenTag> {
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
    const identifier: string = this.identifier

    for (const element of selection) {
      if (RavenTag.is(element)) {
        if (element.identifier === identifier) yield element
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

    if (other instanceof RavenIdentifierOperator) {
      return other.identifier === this.identifier
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenIdentifierOperator {
  /**
   * 
   */
  export function create<Element>(identifier: string): RavenIdentifierOperator<Element> {
    return new RavenIdentifierOperator(identifier)
  }
}