import { RavenAllOperator } from "./RavenAllOperator"
import { RavenBackwardOperator } from "./RavenBackwardOperator"
import { RavenChildrenOperator } from "./RavenChildrenOperator"
import { RavenDepthOperator } from "./RavenDepthOperator"
import { RavenForwardOperator } from "./RavenForwardOperator"
import { RavenLeafOperator } from "./RavenLeafOperator"
import { RavenLeafsOperator } from "./RavenLeafsOperator"
import { RavenNextOperator } from "./RavenNextOperator"
import { RavenNodeOperator } from "./RavenNodeOperator"
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
  export const leaf = RavenLeafOperator.get

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
  export const node = RavenNodeOperator.get

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
}