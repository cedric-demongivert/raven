import { Sequence } from "@cedric-demongivert/gl-tool-collection"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenDisjunctionOperator<Input, Output> implements RavenOperator<Input, Output> {
  /**
   * 
   */
  public readonly operators: Sequence<RavenOperator<Input, Output>>


  /**
   * 
   */
  public constructor(operators: Iterable<RavenOperator<Input, Output>>) {
    this.operators = Sequence.array([...operators])
  }

  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Input>): IterableIterator<Output> {
    for (const operator of this.operators) {
      yield* operator.apply(selection)
    }
  }

  /**
   * 
   */
  public toString(): string {
    return `${this.constructor.name}(${[...this.operators].join(',')})`
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof RavenDisjunctionOperator) {
      return this.operators.equals(other.operators)
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenDisjunctionOperator {
  /**
   * 
   */
  export function create<Input, Output>(operators: Iterable<RavenOperator<Input, Output>>): RavenDisjunctionOperator<Input, Output> {
    return new RavenDisjunctionOperator(operators)
  }
}