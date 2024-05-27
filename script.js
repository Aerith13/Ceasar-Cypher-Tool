// This line waits for the entire HTML document to be fully loaded and parsed
// before executing the code within the function. This ensures that all necessary
// HTML elements are available for manipulation.
document.addEventListener('DOMContentLoaded', function() {
  // These lines use `document.getElementById` to retrieve references to specific HTML
  // elements based on their IDs. These references are stored in constant variables
  // for easier access throughout the code.
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

  // These lines add event listeners to the encode, decode, and bruteforce buttons.
  // When a button is clicked, the corresponding arrow function is executed. These
  // functions manipulate the visibility of the different content sections using
  // `classList.remove('hidden')` and `classList.add('hidden')` to toggle between
  // hidden and visible states. This creates a user interface where only the relevant
  // content area is displayed for each Caesar Cipher operation.
  encodeBtn.addEventListener('click', () => {
    encodeContent.classList.remove('hidden');
    decodeContent.classList.add('hidden');
    bruteforceContent.classList.add('hidden');
  });

  decodeBtn.addEventListener('click', () => {
    encodeContent.classList.add('hidden');
    decodeContent.classList.remove('hidden');
    bruteforceContent.classList.add('hidden');
  });

  bruteforceBtn.addEventListener('click', () => {
    encodeContent.classList.add('hidden');
    decodeContent.classList.add('hidden');
    bruteforceContent.classList.remove('hidden');
  });

  // This section handles the "Encode" functionality. When the submit button is
  // clicked, these lines:
  // - Retrieve the message value from the 'encode-message' input field.
  // - Parse the 'encode-shift' input value into an integer using `parseInt`.
  // - Call the `caesarCipher` function (defined later) to encode the message
  //   with the specified shift.
  // - Update the 'encode-result' element's content to display the encoded message.
  encodeSubmit.addEventListener('click', () => {
    const message = document.getElementById('encode-message').value;
    const shift = parseInt(document.getElementById('encode-shift').value);

    // Error handling for non-numeric shift
    if (isNaN(shift)) {
      document.getElementById('encode-result').textContent = 'Encoded Message: NaN';
      return;
    }

    // Error handling for shift value outside the limits
    const shiftLimit = 25; // Define your desired limit
    if (shift < 0 || shift > shiftLimit) {
      document.getElementById('encode-result').textContent = 'Encoded Message: NaN';
      return;
    }

    const encodedMessage = caesarCipher(message, shift);

    document.getElementById('encode-result').textContent = `Encoded Message: ${encodedMessage}`;
  });

  // This section works similarly to the encode functionality, but for decoding.
  // It retrieves the message, shift value, calls `caesarCipher` with a modified
  // shift (26 - shift for decoding), and updates the 'decode-result' element.
  decodeSubmit.addEventListener('click', () => {
    const message = document.getElementById('decode-message').value;
    const shift = parseInt(document.getElementById('decode-shift').value);

    // Error handling for non-numeric shift
    if (isNaN(shift)) {
      document.getElementById('decode-result').textContent = 'Decoded Message: NaN';
      return;
    }

    // Error handling for shift value outside the limits
    const shiftLimit = 25; // Define your desired limit
    if (shift < 0 || shift > shiftLimit) {
      document.getElementById('decode-result').textContent = 'Decoded Message: NaN';
      return;
    }

    const decodedMessage = caesarCipher(message, 26 - shift);

    document.getElementById('decode-result').textContent = `Decoded Message: ${decodedMessage}`;
  });

  // Function to perform Caesar cipher encryption/decryption
  function caesarCipher(message, shift) {
    // Error handling for letter 'e' as shift value
    if (shift === 69) {
      alert("Error: letter 'e' is not a valid shift value!");
      return message;
    }

    // Error handling for numeric plain text
    if (!isNaN(parseInt(message))) {
      alert("Error: plain text cannot be a number!");
      return message;
    }

    // Enforce limit (e.g., between -25 and 25)
    shift = (shift % 26 + 26) % 26; // Wrap around for negative or larger values
    let result = '';

    for (let i = 0; i < message.length; i++) {
      let c = message.charCodeAt(i);

      if (c >= 65 && c <= 90) {
        // Uppercase letters
        result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
      } else if (c >= 97 && c <= 122) {
        // Lowercase letters
        result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
      } else {
        // Non-alphabetic characters
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

    for (let shift = 0; shift < 26; shift++) {
      const encodedMessage = caesarCipher(message, shift);
      const decodedMessage = caesarCipher(message, 26 - shift);
      table += `<tr><td>${shift}</td><td>${encodedMessage}</td><td>${decodedMessage}</td></tr>`;
    }

    table += '</table>';
    return table;
  }

  bruteforceMessage.addEventListener('input', () => {
    const message = document.getElementById('bruteforce-message').value;
    const table = createShiftTable(message);
    bruteforceResult.innerHTML = table; // Use innerHTML to display the HTML table
  });
});
