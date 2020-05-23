const isPalindrome = function (word) {
  return word === word.split("").reverse().join("");
};

const validateEntry = function ({ name, word }) {
  if (!name || !word) return false;
  return true;
};

module.exports = { isPalindrome, validateEntry };
