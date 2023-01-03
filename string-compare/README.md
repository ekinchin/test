## Implement the function string_compare(a, b) that will perform lexical and case-insensitive comparison on 2 strings.

Return value:
* 0 if a == b
* any negative number if a < b
* any positive number if a > b
lexical (alphabetical) comparison (a < zzzz, aaaa < z)

examples:
* string_compare('apple', 'apricot')<0
* string_compare('pear', 'avocado')>0 - avocado is longer, but pear is greater alphabetically
* string_compare('zz', 'zzzz')<0

case-insensitive comparison (air == AIR) all equality operators (==, >=, <=, !=) are forbidden for the whole strings:
* a<b - comparison of the whole string - prohibited
* a.length<b.length - length comparison - allowed
* a[0]<b[0] - comparison of individual characters - allowed
