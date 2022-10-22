import slugify from 'slugify'

/**
 * 
 */
export namespace RavenSlugifyService {
  /**
   * 
   */
  export function map(content: string): string {
    return slugify(content)
  }
}
