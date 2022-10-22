import { RavenClassOperator } from "./RavenClassOperator"
import { RavenIdentifierOperator } from "./RavenIdentifierOperator"
import { RavenTagOperator } from "./RavenTagOperator"
import { RavenTextOperator } from "./RavenTextOperator"

/**
 * 
 */
export namespace RavenDataOperators {
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
  export const tag = RavenTagOperator.create

  /**
   * 
   */
  export const text = RavenTextOperator.get
}