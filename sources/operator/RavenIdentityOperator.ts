import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenIdentityOperator<Element> implements RavenOperator<Element> {
  /**
   * @see RavenOperator.apply
   */
  public apply(selection: Iterable<Element>): Iterable<Element> {
    return selection
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

    return other instanceof RavenIdentityOperator
  }
}

/**
 * 
 */
export namespace RavenIdentityOperator {
  /**
   * 
   */
  export const INSTANCE: RavenIdentityOperator<any> = new RavenIdentityOperator<any>()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): Iterable<Element> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenIdentityOperator<Element> {
    return INSTANCE
  }
}