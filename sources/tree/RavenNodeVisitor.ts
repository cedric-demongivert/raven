import { RavenNode } from "./RavenNode"

/**
 * 
 */
export class RavenNodeVisitor {
  /**
   * 
   */
  private _stop: boolean

  /**
   * 
   */
  public constructor() {
    this._stop = false
  }

  /**
   * 
   */
  public visit(node: RavenNode): void {
    this.enter(node)

    if (this._stop || node.head == null) {
      this.exit(node)
      this._stop = false
      return
    }

    const end: RavenNode | null = node.end
    let cursor: RavenNode | null = node.head

    while (cursor !== end) {
      this.enter(cursor!)

      if (this._stop || cursor!.head == null) {
        this.exit(cursor!)
        cursor = cursor!.end
        this._stop = false
        continue
      }

      cursor = cursor!.head
    }
  }

  /**
   * 
   */
  public enter(node: RavenNode): void {

  }

  /**
   * 
   */
  public exit(node: RavenNode): void {

  }

  /**
   * 
   */
  public stop(): void {
    this._stop = true
  }
}

/**
 * 
 */
export namespace RavenNodeVisitor {

}