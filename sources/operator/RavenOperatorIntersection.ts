import { Sequence } from "@cedric-demongivert/gl-tool-collection"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenOperatorIntersection<Input, Output> implements RavenOperator<Input, Output> {
  /**
   * 
   */
  public readonly operators: Sequence<RavenOperator<unknown>>

  /**
   * 
   */
  public constructor(operators: Iterable<RavenOperator<unknown>>) {
    this.operators = Sequence.array([...operators])
  }

  /**
   * @see RavenOperator.apply
   */
  public apply(selection: Iterable<Input>): IterableIterator<Output> {
    let result: any = selection

    for (const operator of this.operators) {
      result = operator.apply(result)
    }

    return result
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

    if (other instanceof RavenOperatorIntersection) {
      return this.operators.equals(other.operators)
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenOperatorIntersection {
  /**
   * 
   */
  export function create<Input, Output>(operators: Iterable<RavenOperator<unknown>>): RavenOperatorIntersection<Input, Output> {
    return new RavenOperatorIntersection(operators)
  }
}