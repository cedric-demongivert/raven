import nunjucks from 'nunjucks'
import paths from 'path'

import { RavenSelection } from 'sources/document'
import { RavenCompiler } from './RavenCompiler'

/**
 * 
 */
export class RavenNunjucksCompiler implements RavenCompiler {
  /**
   * 
   */
  public readonly path: string

  /**
   * 
   */
  public constructor(path: string) {
    this.path = paths.resolve(path)
  }

  /**
   * @see RavenCompiler.compile
   */
  public compile<Element>(selection: RavenSelection<Element>): string {
    return nunjucks.render(this.path, { document: selection })
  }
}

/**
 * 
 */
export namespace RavenNunjucksCompiler {
  /**
   * 
   */
  export function create(path: string): RavenNunjucksCompiler {
    return new RavenNunjucksCompiler(path)
  }
}