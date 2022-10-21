import { RavenTag } from "../document"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenClassOperator implements RavenOperator<unknown, RavenTag> {
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
      if (element instanceof RavenTag && element.classes.has(identifier)) {
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
  export function create(identifier: string): RavenClassOperator {
    return new RavenClassOperator(identifier)
  }
}