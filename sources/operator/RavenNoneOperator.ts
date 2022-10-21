import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenNoneOperator<Input, Output> implements RavenOperator<Input, Output> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Input>): IterableIterator<Output> {
    return
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

    return other instanceof RavenNoneOperator
  }
}

/**
 * 
 */
export namespace RavenNoneOperator {
  /**
   * 
   */
  export const INSTANCE: RavenNoneOperator<any, any> = new RavenNoneOperator()

  /**
   * 
   */
  export function apply<Input, Output>(selection: Iterable<Input>): IterableIterator<Output> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Input, Output>(): RavenNoneOperator<Input, Output> {
    return INSTANCE
  }
}