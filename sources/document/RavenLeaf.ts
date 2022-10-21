import { RavenNode } from "./RavenNode"

/**
 * 
 */
export abstract class RavenLeaf extends RavenNode {
  /**
   * 
   */
  public push(toPush: RavenNode): void {
    throw new Error(
      `Unable to push ${toPush.toString()} into ${this.toString()} as the targeted parent ` +
      `is a leaf instance and leaf instances can't hold childrens.`
    )
  }

  /**
   * 
   */
  public unshift(toUnshift: RavenNode): void {
    throw new Error(
      `Unable to unshift ${toUnshift.toString()} into ${this.toString()} as the targeted parent ` +
      `is a leaf instance and leaf instances can't hold childrens.`
    )
  }
}

/**
 * 
 */
export namespace RavenLeaf {
  /**
   * 
   */
  export function is(node: unknown): node is RavenLeaf {
    return node instanceof RavenLeaf
  }
}