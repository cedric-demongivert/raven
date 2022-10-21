import slugify from 'slugify'

/**
 * 
 */
export namespace RavenSlugifier {
  /**
   * 
   */
  export function map(content: string): string {
    return slugify(content)
  }
}
