import { Comparable } from "@cedric-demongivert/gl-tool-utils"
import { RavenFirstOperator } from "./RavenFirstOperator"
import { RavenFloatOperator } from "./RavenFloatOperator"
import { RavenIdentityOperator } from "./RavenIdentityOperator"
import { RavenInstanceOfOperator } from "./RavenInstanceofOperator"
import { RavenIntOperator } from "./RavenIntOperator"
import { RavenNoneOperator } from "./RavenNoneOperator"
import { RavenOperatorIntersection } from "./RavenOperatorIntersection"
import { RavenOperatorUnion } from "./RavenOperatorUnion"


/**
 * 
 */
export interface RavenOperator<Input, Output = Input> extends Comparable {
  /**
   * 
   */
  apply(selection: Iterable<Input>): Iterable<Output>
}

/**
 * 
 */
export namespace RavenOperator {
  /**
   * 
   */
  export const first = RavenFirstOperator.get

  /**
   * 
   */
  export const float = RavenFloatOperator.get

  /**
   * 
   */
  export const identity = RavenIdentityOperator.get

  /**
   * 
   */
  export const instanceOf = RavenInstanceOfOperator.create

  /**
   * 
   */
  export const int = RavenIntOperator.get

  /**
   * 
   */
  export const none = RavenNoneOperator.get

  /**
   * 
   */
  export const intersection = RavenOperatorIntersection.create

  /**
   * 
   */
  export const union = RavenOperatorUnion.create

  /**
   * 
   */
  export function toOperator<Input, Output>(value: string | RavenOperator<Input, Output>): RavenOperator<Input, Output>
  /**
   * 
   */
  export function toOperator<Input, Output>(value: string | RavenOperator<Input, Output> | undefined): RavenOperator<Input, Output> | undefined
  export function toOperator<Input, Output>(value: string | RavenOperator<Input, Output> | undefined): RavenOperator<Input, Output> | undefined {
    const parser = require('./RavenOperatorParser')
    return typeof value === 'string' ? parser.parse(value) : value
  }
}