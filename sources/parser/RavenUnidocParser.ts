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

import { RavenSource } from "../data/RavenSource"
import { RavenText } from "../data/RavenText"
import { RavenTag } from "../data/RavenTag"
import { RavenNode } from "../tree/RavenNode"
import { RavenBlob } from "../RavenBlob"
import { RavenParser } from "./RavenParser"
import { RavenData } from "sources/data/RavenData"

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
  private _result: RavenNode

  /**
   * 
   */
  private _wasWhitespace: boolean

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
    this._result = new RavenNode()
    this._wasWhitespace = true

    this.handleNext = this.handleNext.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  /**
   * 
   */
  private handleStartOfTag(event: UnidocEvent): void {
    if (this._wasWhitespace && this._result.tail != null) {
      const tail: RavenNode = this._result.tail
      if (RavenData.is(tail)) tail.margin = true
    }

    const tag: RavenTag = toRavenTag(event)

    this._result.push(tag)
    this._result = tag
  }

  /**
   * 
   */
  private handleEndOfTag(): void {
    this._result = this._result.parent!
  }

  /**
   * 
   */
  private handleWord(event: UnidocEvent): void {
    const current: RavenNode = this._result
    const tail: RavenNode | null = current.tail

    if (RavenText.is(tail)) {
      if (this._wasWhitespace) {
        tail.words.push(event.symbols.toString())
      } else {
        tail.words[tail.words.length - 1] += event.symbols.toString()
      }
    } else {
      if (this._wasWhitespace && RavenData.is(tail)) {
        tail.margin = true
      }

      const text: RavenText = new RavenText()
      text.words.push(event.symbols.toString())
      current.push(text)
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
        break
      default:
        throw new Error('Unhandled event type : ' + UnidocEventType.toDebugString(event.type) + '.')
    }

    this._wasWhitespace = event.isWhitespace()
  }

  /**
   * 
   */
  private handleSuccess(): void {
    const document: RavenNode = this._result
    this._result = new RavenNode()
    this._wasWhitespace = true

    this.output.start()
    this.output.next(document)
    this.output.success()
  }

  /**
   * 
   */
  private handleFailure(error: Error): void {
    this._result = new RavenNode()
    this._wasWhitespace = true

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
    this._wasWhitespace = true
  }

  /**
   * @see UnidocConsumer.next 
   */
  public next(blob: RavenBlob): void {
    const symbol = this._symbol
    const tracker = this._tracker
    const range = this._range
    const lexer = this._lexer

    const source: RavenSource = new RavenSource()
    source.uri.copy(blob.source)

    this._result.push(new RavenSource())
    this._result = source

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

    this._result = this._result.parent!
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