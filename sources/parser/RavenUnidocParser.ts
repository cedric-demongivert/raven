import {
  UnidocEvent,
  UnidocEventType,
  UnidocLexer,
  UnidocParser,
  UnidocProcess,
  UnidocProducer,
  UnidocRange,
  UnidocSymbol,
  UnidocTracker,
  UTF16CodeUnit
} from "@cedric-demongivert/unidoc"

import { RavenWhitespace } from "../document/RavenWhitespace"
import { RavenWord } from "../document/RavenWord"
import { RavenTag } from "../document/RavenTag"
import { RavenNode } from "../document/RavenNode"
import { RavenBlob } from "../RavenBlob"
import { RavenParser } from "./RavenParser"

/**
 * 
 */
function toRavenTag(event: UnidocEvent): RavenTag {
  const result: RavenTag = new RavenTag()
  result.tag = event.symbols.toString()
  if (event.identifier.size > 0) result.identifier = event.identifier.toString()

  for (const clazz of event.classes.values()) {
    result.classes.add(clazz.toString())
  }

  return result
}

/**
 * 
 */
export class RavenUnidocParser extends UnidocProcess<RavenBlob, RavenNode> implements RavenParser {
  /**
   * 
   */
  private readonly _lexer: UnidocLexer

  /**
   * 
   */
  private readonly _parser: UnidocParser

  /**
   * 
   */
  private readonly _tracker: UnidocTracker

  /**
   * 
   */
  private readonly _symbol: UnidocSymbol

  /**
   * 
   */
  private readonly _range: UnidocRange

  /**
   * 
   */
  private readonly _stack: Array<RavenNode>

  /**
   * 
   */
  private readonly _anchors: Array<number>

  /**
   * 
   */
  public constructor() {
    super()
    this._lexer = new UnidocLexer()
    this._parser = new UnidocParser()
    this._tracker = new UnidocTracker()
    this._symbol = new UnidocSymbol()
    this._range = this._symbol.origin.range
    this._stack = []
    this._anchors = [0]

    this.handleNext = this.handleNext.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  /**
   * 
   */
  private handleStartOfTag(event: UnidocEvent): void {
    this._stack.push(toRavenTag(event))
    this._anchors.push(this._stack.length)
  }

  /**
   * 
   */
  private handleEndOfTag(): void {
    const stack = this._stack
    const anchor: number = this._anchors.pop()!
    const tag: RavenNode = stack[anchor - 1]

    while (stack.length > anchor) {
      tag.unshift(stack.pop()!)
    }
  }

  /**
   * 
   */
  private handleWhitespace(event: UnidocEvent): void {
    const stack = this._stack
    const last: RavenNode | undefined = stack[stack.length - 1]
    const anchor: number = this._anchors[this._anchors.length - 1]!

    if (stack.length > anchor && RavenWhitespace.is(last)) {
      last.content += event.symbols.toString()
    } else {
      stack.push(RavenWhitespace.wrap(event.symbols.toString()))
    }
  }

  /**
   * 
   */
  private handleWord(event: UnidocEvent): void {
    const stack = this._stack
    const last: RavenNode | undefined = stack[stack.length - 1]
    const anchor: number = this._anchors[this._anchors.length - 1]!

    if (stack.length > anchor && RavenWord.is(last)) {
      last.content += event.symbols.toString()
    } else {
      stack.push(RavenWord.wrap(event.symbols.toString()))
    }
  }

  /**
   * 
   */
  private handleNext(event: UnidocEvent): void {
    switch (event.type) {
      case UnidocEventType.START_TAG:
        this.handleStartOfTag(event)
        break
      case UnidocEventType.END_TAG:
        this.handleEndOfTag()
        break
      case UnidocEventType.WORD:
        this.handleWord(event)
        break
      case UnidocEventType.WHITESPACE:
        this.handleWhitespace(event)
        break
      default:
        throw new Error('Unhandled event type : ' + UnidocEventType.toDebugString(event.type) + '.')
    }
  }

  /**
   * 
   */
  private handleSuccess(): void {
    const document: RavenNode = new RavenNode()

    for (const node of this._stack) {
      document.push(node)
    }

    this.output.start()
    this.output.next(document)
    this.output.success()
  }

  /**
   * 
   */
  private handleFailure(error: Error): void {
    this.output.start()
    this.output.failure(error)
  }

  /**
   * @see UnidocConsumer.start 
   */
  public start(): void {
    const lexer = this._lexer
    const parser = this._parser

    lexer.clear()
    parser.clear()

    parser.subscribe(lexer)

    parser.on(UnidocProducer.NEXT, this.handleNext)
    parser.on(UnidocProducer.SUCCESS, this.handleSuccess)
    parser.on(UnidocProducer.FAILURE, this.handleFailure)

    this._tracker.clear()
    this._symbol.clear()

    this._stack.length = 0
    this._anchors.length = 1
  }

  /**
   * @see UnidocConsumer.next 
   */
  public next(blob: RavenBlob): void {
    const symbol = this._symbol
    const tracker = this._tracker
    const range = this._range
    const lexer = this._lexer

    const content: string = blob.buffer.toString() // @TODO UTF-8 / UTF-16 conversion to symbols.

    symbol.origin.source.copy(blob.source)

    let cursor: number = 0

    while (cursor < content.length) {
      const highSurrogate: number = content.charCodeAt(cursor)

      if (highSurrogate > UTF16CodeUnit.AnySurrogate.LOWER_BOUNDARY && highSurrogate < UTF16CodeUnit.AnySurrogate.UPPER_BOUNDARY) {
        const lowSurrogate: number = content.charCodeAt(cursor + 1)
        symbol.code = (highSurrogate - UTF16CodeUnit.HighSurrogate.MINIMUM << 10) + (lowSurrogate - UTF16CodeUnit.LowSurrogate.MINIMUM) + 0x10000
        cursor += 2
      } else {
        symbol.code = highSurrogate
        cursor += 1
      }

      range.fromLocation(tracker.location)
      tracker.next(symbol.code)
      range.toLocation(tracker.location)

      lexer.next(symbol)
    }
  }

  /**
   * 
   */
  public success(): void {
    this._lexer.success()
  }

  /**
   * 
   */
  public failure(error: Error): void {
    this._lexer.failure(error)
  }
}

/**
 * 
 */
export namespace RavenUnidocParser {
  /**
   * 
   */
  export function create(): RavenUnidocParser {
    return new RavenUnidocParser()
  }
}