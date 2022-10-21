import { RavenSelection } from "../document"
import { RavenNunjucksCompiler } from "./RavenNunjucksCompiler"

/**
 * 
 */
export interface RavenCompiler {
  /**
   * 
   */
  compile<Element>(selection: RavenSelection<Element>): string
}

/**
 * 
 */
export namespace RavenCompiler {
  /**
   * 
   */
  export const nunjucks = RavenNunjucksCompiler.create
}