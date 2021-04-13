const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of garmauco', () => {
  const result = palindrome('garmauco')

  expect(result).toBe('ocuamrag')
})

test.skip('palindrome of empty', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})