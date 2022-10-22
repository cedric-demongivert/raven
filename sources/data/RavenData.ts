import { RavenNode } from "../tree/RavenNode"
import { RavenTag } from "./RavenTag"
import { RavenText } from "./RavenText"

/**
 * 
 */
export interface RavenData extends RavenNode {
  /**
   * 
   */
  margin: boolean
}

/**
 * 
 */
export namespace RavenData {
  /**
   * 
   */
  export function is(value: unknown): value is RavenData {
    return RavenTag.is(value) || RavenText.is(value)
  }
}

