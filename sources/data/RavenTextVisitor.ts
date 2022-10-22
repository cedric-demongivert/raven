import { Empty } from "@cedric-demongivert/gl-tool-utils"
import { RavenNode } from "../tree/RavenNode"
import { RavenNodeVisitor } from "../tree/RavenNodeVisitor"
import { RavenTag } from "./RavenTag"
import { RavenText } from "./RavenText"

/**
 * 
 */
export class RavenTextVisitor extends RavenNodeVisitor {
  /**
   * 
   */
  private _result: string

  /**
   * 
   */
  private _margin: boolean

  /**
   * 
   */
  public constructor() {
    super()
    this._result = Empty.STRING
    this._margin = false
  }

  /**
   * 
   */
  public visit(node: RavenNode): string {
    super.visit(node)
    const result: string = this._result
    this._result = Empty.STRING
    this._margin = false
    return result
  }

  /**
   * 
   */
  public enter(node: RavenNode): void {
    if (RavenText.is(node)) {
      if (this._margin) this._result += ' '
      this._result += node.words.join(' ')
      this._margin = node.margin
      this.stop()
    }
  }

  /**
   * 
   */
  public exit(node: RavenNode): void {
    if (RavenTag.is(node)) {
      this._margin = node.margin
    }
  }
}

/**
 * 
 */
export namespace RavenTextVisitor {
  /**
   * 
   */
  export const INSTANCE: RavenTextVisitor = new RavenTextVisitor()

  /**
   * 
   */
  export function get(): RavenTextVisitor {
    return INSTANCE
  }
}