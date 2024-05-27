// Wait for the DOM to load before executing the code
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the necessary elements
  const encodeBtn = document.getElementById('encode-btn');
  const decodeBtn = document.getElementById('decode-btn');
  const bruteforceBtn = document.getElementById('bruteforce-btn');
  const encodeContent = document.getElementById('encode-content');
  const decodeContent = document.getElementById('decode-content');
  const bruteforceContent = document.getElementById('bruteforce-content');
  const encodeSubmit = document.getElementById('encode-submit');
  const decodeSubmit = document.getElementById('decode-submit');
  const bruteforceMessage = document.getElementById('bruteforce-message');
  const bruteforceResult = document.getElementById('bruteforce-result');

  // Event listener for encode button click
  encodeBtn.addEventListener('click', () => {
    encodeContent.classList.remove('hidden');
    decodeContent.classList.add('hidden');
    bruteforceContent.classList.add('hidden');
  });

  // Event listener for decode button click
  decodeBtn.addEventListener('click', () => {
    encodeContent.classList.add('hidden');
    decodeContent.classList.remove('hidden');
    bruteforceContent.classList.add('hidden');
  });

  // Event listener for bruteforce button click
  bruteforceBtn.addEventListener('click', () => {
    encodeContent.classList.add('hidden');
    decodeContent.classList.add('hidden');
    bruteforceContent.classList.remove('hidden');
  });

  // Event listener for encode submit button click
  encodeSubmit.addEventListener('click', () => {
    const message = document.getElementById('encode-message').value;
    const shift = parseInt(document.getElementById('encode-shift').value);

    // Check if the shift value is not a number
    if (isNaN(shift)) {
      document.getElementById('encode-result').textContent = 'Encoded Message: NaN';
      return;
    }

    const encodedMessage = caesarCipher(message, shift);
    document.getElementById('encode-result').textContent = `Encoded Message: ${encodedMessage}`;
  });

  // Event listener for decode submit button click
  decodeSubmit.addEventListener('click', () => {
    const message = document.getElementById('decode-message').value;
    const shift = parseInt(document.getElementById('decode-shift').value);

    // Check if the shift value is not a number
    if (isNaN(shift)) {
      document.getElementById('decode-result').textContent = 'Decoded Message: NaN';
      return;
    }

    const decodedMessage = caesarCipher(message, 26 - shift);
    document.getElementById('decode-result').textContent = `Decoded Message: ${decodedMessage}`;
  });

  // Function to perform Caesar cipher encryption/decryption
  function caesarCipher(message, shift) {
    // Normalize the shift value to be within the range of 0-25
    shift = (shift % 26 + 26) % 26;
    let result = '';

    // Iterate over each character in the message
    for (let i = 0; i < message.length; i++) {
      let c = message.charCodeAt(i);

      // Check if the character is uppercase
      if (c >= 65 && c <= 90) {
        result += String.fromCharCode(((c - 65 + shift) % 26) + 65); // Apply the shift to uppercase characters
      }
      // Check if the character is lowercase
      else if (c >= 97 && c <= 122) {
        result += String.fromCharCode(((c - 97 + shift) % 26) + 97); // Apply the shift to lowercase characters
      }
      // For non-alphabetic characters, keep them unchanged
      else {
        result += message.charAt(i);
      }
    }

    return result;
  }

  // Function to create the shift table for bruteforce
  function createShiftTable(message) {
    let table = '';
    table += '<table class="table table-dark table-striped">';
    table += '<tr><th>Shift</th><th>Encoded</th><th>Decoded</th></tr>';

    // Iterate over all possible shift values (0-25)
    for (let shift = 0; shift < 26; shift++) {
      const encodedMessage = caesarCipher(message, shift);
      const decodedMessage = caesarCipher(message, 26 - shift);
      table += `<tr><td>${shift}</td><td>${encodedMessage}</td><td>${decodedMessage}</td></tr>`;
    }

    table += '</table>';
    return table;
  }

  // Event listener for bruteforce message input
  bruteforceMessage.addEventListener('input', () => {
    const message = document.getElementById('bruteforce-message').value;
    const table = createShiftTable(message);
    bruteforceResult.innerHTML = table;
  });
});
