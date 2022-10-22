import { RavenTag } from "../RavenTag"
import { RavenOperator } from "../../operator/RavenOperator"

/**
 * 
 */
export class RavenIdentifierOperator implements RavenOperator<unknown, RavenTag> {
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
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenTag> {
    const identifier: string = this.identifier

    for (const element of selection) {
      if (RavenTag.is(element)) {
        if (element.identifier === identifier) yield element
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
  export function create(identifier: string): RavenIdentifierOperator {
    return new RavenIdentifierOperator(identifier)
  }
}