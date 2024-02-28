
export function generateRandomPassword(length: number = 8): string {
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var numbers = "0123456789";
  var specialChars = "!@#$%^&*()_+-=";

  var password = "";

  // Add at least one character from each category
  password += getRandomCharacter(uppercase);
  password += getRandomCharacter(lowercase);
  password += getRandomCharacter(numbers);
  password += getRandomCharacter(specialChars);

  // Add the remaining characters randomly
  var remainingLength = length - 4;
  for (var i = 0; i < remainingLength; i++) {
    var charset = uppercase + lowercase + numbers + specialChars;
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Shuffle the password characters
  password = shuffleString(password);

  return password;
}

// Helper function to get a random character from a string
function getRandomCharacter(string: string): string {
  var randomIndex = Math.floor(Math.random() * string.length);
  return string[randomIndex];
}

// Helper function to shuffle the characters of a string
function shuffleString(string: string): string {
  var array = string?.split('');
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.join('');
}