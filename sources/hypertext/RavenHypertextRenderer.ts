import { Empty } from "@cedric-demongivert/gl-tool-utils"
import { RavenText } from "../data/RavenText"
import { RavenNode } from "../tree/RavenNode"
import { RavenTag } from "../data/RavenTag"
import { RavenTextVisitor } from "../data/RavenTextVisitor"

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
    const content: string = RavenTextVisitor.get().visit(node)

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
        result += RavenTextVisitor.get().visit(element)
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
  export function renderHypertext(nodes: Iterable<RavenNode>): string {
    let result: string = Empty.STRING

    for (const node of nodes) {
      if (node instanceof RavenText) {
        result += node.words.join(' ')
        if (node.margin) {
          result += ' '
        }
      }

      if (node instanceof RavenTag) {
        if (node.tag === 'emphasize') {
          result += '<strong>'
          result += renderHypertext(node.children())
          result += '</strong>'

          if (node.margin) {
            result += ' '
          }
        }
      }
    }

    return result
  }
}