import { RavenOperator } from "../../operator"

import { RavenNode } from "../RavenNode"

import { RavenAllOperator } from "./RavenAllOperator"
import { RavenBackwardOperator } from "./RavenBackwardOperator"
import { RavenChildrenOperator } from "./RavenChildrenOperator"
import { RavenDepthOperator } from "./RavenDepthOperator"
import { RavenForwardOperator } from "./RavenForwardOperator"
import { RavenLeafsOperator } from "./RavenLeafsOperator"
import { RavenNextOperator } from "./RavenNextOperator"
import { RavenParentOperator } from "./RavenParentOperator"
import { RavenParentsOperator } from "./RavenParentsOperator"
import { RavenPreviousOperator } from "./RavenPreviousOperator"

/**
 * 
 */
export namespace RavenNodeOperators {
  /**
   * 
   */
  export const all = RavenAllOperator.get

  /**
   * 
   */
  export const backward = RavenBackwardOperator.get

  /**
   * 
   */
  export const children = RavenChildrenOperator.get

  /**
   * 
   */
  export const forward = RavenForwardOperator.get

  /**
   * 
   */
  export const leafs = RavenLeafsOperator.get

  /**
   * 
   */
  export const next = RavenNextOperator.get

  /**
   * 
   */
  export const parent = RavenParentOperator.get

  /**
   * 
   */
  export const parents = RavenParentsOperator.get

  /**
   * 
   */
  export const previous = RavenPreviousOperator.get

  /**
   * 
   */
  export const depth = RavenDepthOperator.create

  /**
   * 
   */
  export const INSTANCEOF_NODE: RavenOperator<unknown, RavenNode> = RavenOperator.instanceOf(RavenNode)

  /**
   * 
   */
  export function instanceOfNode(): RavenOperator<unknown, RavenNode> {
    return INSTANCEOF_NODE
  }
}