import nunjucks from 'nunjucks'
import paths from 'path'
import fileSystem from 'fs'

import { RavenSelection } from '../RavenSelection'
import { RavenHTMLPostprocess } from '../RavenHTMLPostprocess'
import { RavenCompiler } from './RavenCompiler'

/**
 * 
 */
const MKDIR_OPTIONS = {
  recursive: true
}

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
  public compile<Element>(selection: RavenSelection<Element>, output: string): void
  public compile<Element>(selection: RavenSelection<Element>): string
  public compile<Element>(selection: RavenSelection<Element>, output?: string): string | void {
    const result: string = RavenHTMLPostprocess.apply(
      nunjucks.render(this.path, { document: selection })
    )

    if (output == null) {
      return result
    }

    fileSystem.mkdirSync(paths.dirname(output), MKDIR_OPTIONS)
    fileSystem.writeFileSync(output, result)
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