import { Constructor } from "@cedric-demongivert/gl-tool-utils"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenInstanceOfOperator<Input, Output> implements RavenOperator<Input, Output> {
  /**
   * 
   */
  public readonly type: Constructor<Output>

  /**
   * 
   */
  public constructor(type: Constructor<Output>) {
    this.type = type
  }

  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Input>): IterableIterator<Output> {
    for (const element of selection) {
      if (element instanceof this.type) {
        yield element
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

    return other instanceof RavenInstanceOfOperator && other.type === this.type
  }
}

/**
 * 
 */
export namespace RavenInstanceOfOperator {
  /**
   * 
   */
  export function create<Input, Output>(type: Constructor<Output>): RavenInstanceOfOperator<Input, Output> {
    return new RavenInstanceOfOperator(type)
  }
}