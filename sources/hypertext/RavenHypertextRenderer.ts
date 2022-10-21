import { Empty } from "@cedric-demongivert/gl-tool-utils"
import { RavenWhitespace } from "../document/RavenWhitespace"
import { RavenWord } from "../document/RavenWord"
import { RavenOperator } from "../operator/RavenOperator"
import { RavenNode } from "../document/RavenNode"
import { RavenTag } from "../document/RavenTag"

/**
 * 
 */
export const TITLE_TAG = 'title'

/**
 * 
 */
export const SECTION_TAG = 'section'

/**
 * 
 */
export const PARAGRAPH_TAG = 'paragraph'

/**
 * 
 */
export const EMPASIZE_TAG = 'empasize'

/**
 * 
 */
export namespace RavenHypertextRenderer {
  /**
   * 
   */
  export function render(nodes: Iterable<RavenNode>, depth: number): string {
    let result: string = Empty.STRING

    for (const element of nodes) {
      if (!RavenTag.is(element)) continue

      if (element.tag === SECTION_TAG) {
        result += renderSection(element, depth + 1)
      }

      if (element.tag === PARAGRAPH_TAG) {
        result += renderParagraph(element)
      }
    }

    return result
  }

  /**
   * 
   */
  export function renderSection(node: RavenNode, depth: number): string {
    let result: string = '<section>'

    for (const element of node.children()) {
      if (RavenTag.is(element) && element.tag === TITLE_TAG) {
        result += renderSectionTitle(element, depth)
      }
    }

    result += render(node.children(), depth + 1)
    result += '</section>'

    return result
  }

  /**
   * 
   */
  export function renderSectionTitle(node: RavenNode, depth: number): string {
    const content: string = renderText(node.all())

    switch (depth) {
      case 0:
        return `<h1 class="title title-1">${content}</h1>`
      case 1:
        return `<h2 class="title title-2">${content}</h2>`
      case 2:
        return `<h3 class="title title-3">${content}</h3>`
      case 3:
        return `<h4 class="title title-4">${content}</h4>`
      case 4:
        return `<h5 class="title title-5">${content}</h5>`
      case 5:
        return `<h6 class="title title-6">${content}</h6>`
      default:
        return `<strong class="title title-${depth + 1}">${content}</strong>`
    }
  }

  /**
   * 
   */
  export function renderParagraph(node: RavenNode): string {
    let result: string = '<p>'

    for (const element of node.children()) {
      if (RavenTag.is(element) && element.tag === TITLE_TAG) {
        result += '<strong class="paragraph-title">'
        result += renderText(element.all())
        result += '</strong>'
      }
    }

    result += renderHypertext(node.children())
    result += '</p>'

    return result
  }

  /**
   * 
   */
  export function renderText(nodes: Iterable<RavenNode>): string {
    let result: string = Empty.STRING
    let words: Iterator<string> = RavenOperator.text().apply(nodes)
    let iteratorResult: IteratorResult<string> = words.next()

    if (iteratorResult.done) {
      return result
    }

    result = iteratorResult.value
    iteratorResult = words.next()

    while (!iteratorResult.done) {
      result += ' '
      result += iteratorResult.value
      iteratorResult = words.next()
    }

    return result
  }

  /**
   * 
   */
  export function renderHypertext(nodes: Iterable<RavenNode>): string {
    let wasSpace: boolean = true
    let result: string = Empty.STRING

    for (const node of nodes) {
      if (node instanceof RavenWhitespace && !wasSpace) {
        result += ' '
      }

      if (node instanceof RavenWord) {
        result += node.content
      }

      if (node instanceof RavenTag) {
        if (node.tag === 'emphasize') {
          result += '<strong>'
          result += renderHypertext(node.children())
          result += '</strong>'
        }
      }

      wasSpace = node instanceof RavenWhitespace
    }

    return result
  }
}