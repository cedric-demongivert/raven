import { Comparable } from "@cedric-demongivert/gl-tool-utils"

import { RavenClassOperator } from "./RavenClassOperator"
import { RavenAllOperator } from "./RavenAllOperator"
import { RavenConjunctionOperator } from "./RavenConjunctionOperator"
import { RavenDisjunctionOperator } from "./RavenDisjunctionOperator"
import { RavenIdentifierOperator } from "./RavenIdentifierOperator"
import { RavenNoneOperator } from "./RavenNoneOperator"
import { RavenTagOperator } from "./RavenTagOperator"
import { RavenDepthOperator } from "./RavenDepthOperator"
import { RavenIdentityOperator } from "./RavenIdentityOperator"
import { RavenParentOperator } from "./RavenParentOperator"
import { RavenFirstOperator } from "./RavenFirstOperator"
import { RavenLastOperator } from "./RavenLastOperator"
import { RavenWordOperator } from "./RavenWordOperator"
import { RavenNextOperator } from "./RavenNextOperator"
import { RavenPreviousOperator } from "./RavenPreviousOperator"
import { RavenChildrenOperator } from "./RavenChildrenOperator"
import { RavenParentsOperator } from "./RavenParentsOperator"
import { RavenForwardOperator } from "./RavenForwardOperator"
import { RavenBackwardOperator } from "./RavenBackwardOperator"
import { RavenAnyTagOperator } from "./RavenAnyTagOperator"
import { RavenTextOperator } from "./RavenTextOperator"
import { RavenFloatOperator } from "./RavenFloatOperator"
import { RavenIntOperator } from "./RavenIntOperator"

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
  export const identity = RavenIdentityOperator.get

  /**
   * 
   */
  export const all = RavenAllOperator.get

  /**
   * 
   */
  export const none = RavenNoneOperator.get

  /**
   * 
   */
  export const tag = RavenTagOperator.create

  /**
   * 
   */
  export const tags = RavenAnyTagOperator.get

  /**
   * 
   */
  export const clazz = RavenClassOperator.create

  /**
   * 
   */
  export const identifier = RavenIdentifierOperator.create

  /**
   * 
   */
  export const intersection = RavenConjunctionOperator.create

  /**
   * 
   */
  export const union = RavenDisjunctionOperator.create

  /**
   * 
   */
  export const depth = RavenDepthOperator.create

  /**
   * 
   */
  export const parent = RavenParentOperator.get

  /**
   * 
   */
  export const first = RavenFirstOperator.get

  /**
   * 
   */
  export const last = RavenLastOperator.get

  /**
   * 
   */
  export const word = RavenWordOperator.get

  /**
   * 
   */
  export const text = RavenTextOperator.get

  /**
   * 
   */
  export const children = RavenChildrenOperator.get

  /**
   * 
   */
  export const parents = RavenParentsOperator.get

  /**
   * 
   */
  export const next = RavenNextOperator.get

  /**
   * 
   */
  export const previous = RavenPreviousOperator.get

  /**
   * 
   */
  export const forward = RavenForwardOperator.get

  /**
   * 
   */
  export const backward = RavenBackwardOperator.get

  /**
   * 
   */
  export const float = RavenFloatOperator.get

  /**
   * 
   */
  export const int = RavenIntOperator.get

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