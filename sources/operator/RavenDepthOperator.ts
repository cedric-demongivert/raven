import { Sequence } from "@cedric-demongivert/gl-tool-collection"
import { RavenNode } from "../document"
import { RavenAllOperator } from "./RavenAllOperator"
import { RavenNodeOperator } from "./RavenNodeOperator"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenDepthOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * 
   */
  public readonly operators: Sequence<RavenOperator<RavenNode>>

  /**
   * 
   */
  public constructor(operators: Iterable<RavenOperator<RavenNode>>) {
    this.operators = Sequence.array([...operators])
  }

  /**
   * @see RavenOperator.apply
   */
  public apply(selection: Iterable<unknown>): Iterable<RavenNode> {
    const operators = this.operators

    let result: Iterable<RavenNode> = RavenNodeOperator.apply(selection)

    if (operators.size <= 0) return result

    result = operators.get(0).apply(result)

    for (let index = 1, size = operators.size; index < size; ++index) {
      result = RavenAllOperator.apply(result)
      result = operators.get(index).apply(result)
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

    if (other instanceof RavenDepthOperator) {
      return this.operators.equals(other.operators)
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenDepthOperator {
  /**
   * 
   */
  export function create(operators: Iterable<RavenOperator<RavenNode>>): RavenDepthOperator {
    return new RavenDepthOperator(operators)
  }
}