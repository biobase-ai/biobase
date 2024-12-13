import { urlRegex } from 'components/interfaces/Auth/Auth.constants'
import { describe, it, expect } from 'vitest'

describe('Auth.constants: urlRegex', () => {
  it('should match valid URLs', () => {
    const validUrls = [
      'http://domain.com',
      'https://biobase.io',
      'https://new-domain-vercel.com',
      'www.test-domain.com',
      'exp://exp.host/some-app',
      'exp://exp.host/some-app?release-channel=default',
      'https://biobase.studio/dashboard',
      'http://localhost:3000',
      'https://biobase.studio?name=test',
      'https://biobase.studio?name=test&description=hello&page=2',
      'https://biobase*.com',
      'https://biobase.studio/*',
      'https://new-*-domain.com/*',
      'https://new-*-domain.com/*/*/*',
      'https://sub-*-domain.new-*-domain.com/*/*/*',
    ]

    validUrls.forEach((url) => {
      expect(urlRegex.test(url)).toBe(true)
    })
  })

  it('should not match invalid URLs', () => {
    const invalidUrls = ['biobase', 'mailto:test@gmail.com', 'hello world.com', 'email@domain.com']

    const failingInvalidUrls = invalidUrls.filter((url) => urlRegex.test(url))
    if (failingInvalidUrls.length > 0) {
      console.log('Failing invalid URLs:', failingInvalidUrls)
    }

    invalidUrls.forEach((url) => {
      expect(urlRegex.test(url)).toBe(false)
    })
  })
})
