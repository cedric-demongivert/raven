import { RavenOperator } from "../../operator/RavenOperator"

import { RavenTag } from "../RavenTag"

/**
 * 
 */
export class RavenClassOperator<Element> implements RavenOperator<Element, Element | RavenTag> {
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
        if (element.classes.has(identifier)) yield element
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

    if (other instanceof RavenClassOperator) {
      return other.identifier === this.identifier
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenClassOperator {
  /**
   * 
   */
  export function create<Element>(identifier: string): RavenClassOperator<Element> {
    return new RavenClassOperator(identifier)
  }
}