import { RavenSlugifier } from '../../sources/RavenSlugifier'

/**
 * 
 */
describe('RavenSlugifier', function () {
  /**
   * 
   */
  describe('#map', function () {
    /**
     * 
     */
    it('replaces spaces by a dash', function () {
      expect(RavenSlugifier.map('a fragment of text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces tabulations by a dash', function () {
      expect(RavenSlugifier.map('a-fragment\tof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces form feeds by a dash', function () {
      expect(RavenSlugifier.map('a-fragment\fof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces newlines by a dash', function () {
      expect(RavenSlugifier.map('a-fragment\nof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces carriage returns by a dash', function () {
      expect(RavenSlugifier.map('a-fragment\rof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('replaces unix newlines by a dash', function () {
      expect(RavenSlugifier.map('a-fragment\r\nof-text')).toBe('a-fragment-of-text')
    })

    /**
     * 
     */
    it('removes grave accents', function () {
      expect(RavenSlugifier.map('é')).toBe('e')
      expect(RavenSlugifier.map('ó')).toBe('o')
      expect(RavenSlugifier.map('ú')).toBe('u')
      expect(RavenSlugifier.map('í')).toBe('i')
    })

    /**
     * 
     */
    it('removes acute accents', function () {
      expect(RavenSlugifier.map('è')).toBe('e')
      expect(RavenSlugifier.map('ò')).toBe('o')
      expect(RavenSlugifier.map('ù')).toBe('u')
      expect(RavenSlugifier.map('ì')).toBe('i')
    })

    /**
     * 
     */
    it('removes tremas', function () {
      expect(RavenSlugifier.map('ë')).toBe('e')
      expect(RavenSlugifier.map('ö')).toBe('o')
      expect(RavenSlugifier.map('ü')).toBe('u')
      expect(RavenSlugifier.map('ï')).toBe('i')
    })

    /**
     * 
     */
    it('removes cedillas', function () {
      expect(RavenSlugifier.map('ç')).toBe('c')
    })

    /**
     * 
     */
    //it('replaces commas by a dash', function () {
    //  expect(RavenSlugifier.map('a,punctuated-text')).toBe('a-punctuated-text')
    //})

    /**
     * 
     */
    //it('replaces semicolons by a dash', function () {
    //  expect(RavenSlugifier.map('a;punctuated-text')).toBe('a-punctuated-text')
    //})

    /**
     * 
     */
    //it('replaces dots by a dash', function () {
    //  expect(RavenSlugifier.map('a.punctuated-text')).toBe('a-punctuated-text')
    //})

    /**
     * 
     */
    //it('replaces combinations of spaces and punctuations by a dash', function () {
    //  expect(RavenSlugifier.map('a; punctuated ,\ttext')).toBe('a-punctuated-text')
    //})
  })
})