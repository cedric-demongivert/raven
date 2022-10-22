import { Empty } from "@cedric-demongivert/gl-tool-utils"

/**
 * 
 */
export class RavenNode {
  /**
   * 
   */
  private _parent: RavenNode | null

  /**
   * 
   */
  private _next: RavenNode | null

  /**
   * 
   */
  private _previous: RavenNode | null

  /**
   * 
   */
  private _head: RavenNode | null

  /**
   * 
   */
  private _tail: RavenNode | null

  /**
   * 
   */
  public get link(): RavenNode | null {
    if (this._head) return this._head
    if (this._next) return this._next

    let current: RavenNode | null = this._parent

    while (current) {
      if (current._next) return current._next
      current = current._parent
    }

    return null
  }

  /**
   * 
   */
  public get end(): RavenNode | null {
    let current: RavenNode = this

    while (current.tail) {
      current = current.tail
    }

    return current.link
  }

  /**
   * 
   */
  public get head(): RavenNode | null {
    return this._head
  }

  /**
   * 
   */
  public get tail(): RavenNode | null {
    return this._tail
  }

  /**
   * 
   */
  public get parent(): RavenNode | null {
    return this._parent
  }

  /**
   * 
   */
  public get next(): RavenNode | null {
    return this._next
  }

  /**
   * 
   */
  public get previous(): RavenNode | null {
    return this._previous
  }

  /**
   * 
   */
  public constructor() {
    this._parent = null
    this._next = null
    this._previous = null
    this._head = null
    this._tail = null
  }

  /**
   * 
   */
  public * forward(): IterableIterator<RavenNode> {
    let current: RavenNode | null = this._next

    while (current != null) {
      yield current
      current = current._next
    }
  }

  /**
   * 
   */
  public * backward(): IterableIterator<RavenNode> {
    let current: RavenNode | null = this._previous

    while (current != null) {
      yield current
      current = current._previous
    }
  }

  /**
   * 
   */
  public * parents(): IterableIterator<RavenNode> {
    let current: RavenNode | null = this._parent

    while (current != null) {
      yield current
      current = current._parent
    }
  }

  /**
   * 
   */
  public * children(): IterableIterator<RavenNode> {
    let current: RavenNode | null = this._head

    while (current != null) {
      yield current
      current = current.next
    }
  }

  /**
   * 
   */
  public * all(): IterableIterator<RavenNode> {
    if (this._head == null) return

    const limit: RavenNode | null = this._tail!.link
    let current: RavenNode | null = this._head

    while (current !== limit) {
      yield current!
      current = current!.link
    }
  }

  /**
   * 
   */
  public * leafs(): IterableIterator<RavenNode> {
    if (this._head == null) return

    const limit: RavenNode | null = this._tail!.link
    let current: RavenNode | null = this._head

    while (current !== limit) {
      if (current!._head == null) yield current!
      current = current!.link
    }
  }

  /**
   * 
   */
  public empty(): void {
    let current: RavenNode | null = this._head

    while (current != null) {
      current._parent = null
      current = current.next
    }

    this._head = null
    this._tail = null
  }

  /**
   * 
   */
  public detach(): void {
    const oldParent: RavenNode | null = this._parent
    const oldNext: RavenNode | null = this._next
    const oldPrevious: RavenNode | null = this._previous

    this._parent = null
    this._next = null
    this._previous = null

    if (oldPrevious === null) {
      if (oldParent) oldParent._head = oldNext
    } else {
      oldPrevious._next = oldNext
    }

    if (oldNext === null) {
      if (oldParent) oldParent._tail = oldPrevious
    } else {
      oldNext._previous = oldPrevious
    }
  }

  /**
   * 
   */
  public append(toAppend: RavenNode): void {
    const oldNext: RavenNode | null = this._next

    toAppend.detach()
    toAppend._parent = this._parent

    this._next = toAppend
    toAppend._previous = this

    if (oldNext === null) {
      if (this._parent) this._parent._tail = toAppend
    } else {
      oldNext._previous = toAppend
      toAppend._next = oldNext
    }
  }

  /**
   * 
   */
  public prepend(toPrepend: RavenNode): void {
    const oldPrevious: RavenNode | null = this._previous

    toPrepend.detach()
    toPrepend._parent = this._parent

    this._previous = toPrepend
    toPrepend._next = this

    if (oldPrevious === null) {
      if (this._parent) this._parent._head = toPrepend
    } else {
      oldPrevious._next = toPrepend
      toPrepend._previous = oldPrevious
    }
  }

  /**
   * 
   */
  public push(toPush: RavenNode): void {
    if (this._tail != null) return this._tail.append(toPush)

    toPush.detach()

    this._head = toPush
    this._tail = toPush
    toPush._parent = this
  }

  /**
   * 
   */
  public unshift(toUnshift: RavenNode): void {
    if (this._head != null) return this._head.prepend(toUnshift)

    toUnshift.detach()

    this._head = toUnshift
    this._tail = toUnshift
    toUnshift._parent = this
  }

  /**
   * 
   */
  public toString(depth: number = 0): string {
    return Empty.STRING
  }
}

/**
 * 
 */
export namespace RavenNode {
  /**
   * 
   */
  export function is(element: unknown): element is RavenNode {
    return element instanceof RavenNode
  }

  /**
   * 
   */
  export function create(): RavenNode {
    return new RavenNode()
  }
}