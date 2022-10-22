import { Sequence } from "@cedric-demongivert/gl-tool-collection"

import { RavenOperator } from "../../operator/RavenOperator"

import { RavenNode } from "../RavenNode"

import { RavenAllOperator } from "./RavenAllOperator"
import { RavenNodeOperator } from "./RavenNodeOperator"

/**
 * 
 */
export class RavenDepthOperator<Element> implements RavenOperator<Element, Element | RavenNode> {
  /**
   * 
   */
  public readonly operators: Sequence<RavenOperator<Element | RavenNode>>

  /**
   * 
   */
  public constructor(operators: Iterable<RavenOperator<RavenNode>>) {
    this.operators = Sequence.array([...operators])
  }

  /**
   * @see RavenOperator.apply
   */
  public apply(selection: Iterable<Element>): Iterable<Element | RavenNode> {
    const operators = this.operators

    if (operators.size <= 0) return selection

    let result = operators.get(0).apply(selection)

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
  export function create<Element>(operators: Iterable<RavenOperator<RavenNode>>): RavenDepthOperator<Element> {
    return new RavenDepthOperator(operators)
  }
}