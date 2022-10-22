import { RavenSlugifyService } from '../../sources/service/RavenSlugifyService'

/**
 * 
 */
describe('RavenSlugifyService', function () {
  /**
   * 
   */
  describe('#map', function () {
    /**
     * 
     */
    it('replaces spaces by a dash', function () {
      expect(RavenSlugifyService.map('a fragment of text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces tabulations by a dash', function () {
      expect(RavenSlugifyService.map('a-fragment\tof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces form feeds by a dash', function () {
      expect(RavenSlugifyService.map('a-fragment\fof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces newlines by a dash', function () {
      expect(RavenSlugifyService.map('a-fragment\nof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces carriage returns by a dash', function () {
      expect(RavenSlugifyService.map('a-fragment\rof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces unix newlines by a dash', function () {
      expect(RavenSlugifyService.map('a-fragment\r\nof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('removes grave accents', function () {
      expect(RavenSlugifyService.map('é')).toBe('e')
      expect(RavenSlugifyService.map('ó')).toBe('o')
      expect(RavenSlugifyService.map('ú')).toBe('u')
      expect(RavenSlugifyService.map('í')).toBe('i')
    })

    /**
     * 
     */
    it('removes acute accents', function () {
      expect(RavenSlugifyService.map('è')).toBe('e')
      expect(RavenSlugifyService.map('ò')).toBe('o')
      expect(RavenSlugifyService.map('ù')).toBe('u')
      expect(RavenSlugifyService.map('ì')).toBe('i')
    })

    /**
     * 
     */
    it('removes tremas', function () {
      expect(RavenSlugifyService.map('ë')).toBe('e')
      expect(RavenSlugifyService.map('ö')).toBe('o')
      expect(RavenSlugifyService.map('ü')).toBe('u')
      expect(RavenSlugifyService.map('ï')).toBe('i')
    })

    /**
     * 
     */
    it('removes cedillas', function () {
      expect(RavenSlugifyService.map('ç')).toBe('c')
    })

    /**
     * 
     */
    //it('replaces commas by a dash', function () {
    //  expect(RavenSlugifyService.map('a,punctuated-text')).toBe('a-punctuated-text')
    //})

    /**
     * 
     */
    //it('replaces semicolons by a dash', function () {
    //  expect(RavenSlugifyService.map('a;punctuated-text')).toBe('a-punctuated-text')
    //})

    /**
     * 
     */
    //it('replaces dots by a dash', function () {
    //  expect(RavenSlugifyService.map('a.punctuated-text')).toBe('a-punctuated-text')
    //})

    /**
     * 
     */
    //it('replaces combinations of spaces and punctuations by a dash', function () {
    //  expect(RavenSlugifyService.map('a; punctuated ,\ttext')).toBe('a-punctuated-text')
    //})
  })
})