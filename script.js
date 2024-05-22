document.addEventListener('DOMContentLoaded', function() {
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

    encodeSubmit.addEventListener('click', () => {
        const message = document.getElementById('encode-message').value;
        const shift = parseInt(document.getElementById('encode-shift').value);
        const encodedMessage = caesarCipher(message, shift);
        document.getElementById('encode-result').textContent = `Encoded Message: ${encodedMessage}`;
    });

    decodeSubmit.addEventListener('click', () => {
        const message = document.getElementById('decode-message').value;
        const shift = parseInt(document.getElementById('decode-shift').value);
        const decodedMessage = caesarCipher(message, 26 - shift);
        document.getElementById('decode-result').textContent = `Decoded Message: ${decodedMessage}`;
    });

    bruteforceMessage.addEventListener('input', () => {
        const message = document.getElementById('bruteforce-message').value;
        let result = '';
        for (let shift = 0; shift < 26; shift++) {
            result += `Shift ${shift}: ${caesarCipher(message, shift)}\n`;
        }
        bruteforceResult.textContent = 'Encoded messages:\n\n' + result + '\nDecoded messages:\n\n' + result.replace(/Shift/g, 'Shift');
    });

    function caesarCipher(message, shift) {
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
});
