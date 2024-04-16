// Test case 1: Valid input
let validInput = 'STAR-ABCD-EFGH';
generateQR(validInput);
// Expected output: The QR code should be generated and displayed on the page, and the button text should be changed to 'DOWNLOAD'.

// Test case 2: Invalid input
let invalidInput = 'INVALID-CODE';
generateQR(invalidInput);
// Expected output: An error notification should be displayed on the page with the message 'Invalid input. Please enter a referral code in the format STAR-XXXX-XXXX.'.

// Test case 3: Empty input
let emptyInput = '';
generateQR(emptyInput);
// Expected output: An error notification should be displayed on the page with the message 'Invalid input. Please enter a referral code in the format STAR-XXXX-XXXX.'.

// Test case 4: Input with lowercase letters
let lowercaseInput = 'star-abcd-efgh';
generateQR(lowercaseInput);
// Expected output: The QR code should be generated and displayed on the page, and the button text should be changed to 'DOWNLOAD'.

// Test case 5: Input with additional characters
let additionalCharsInput = 'STAR-ABCD-EFGH-1234';
generateQR(additionalCharsInput);
// Expected output: The QR code should be generated and displayed on the page, and the button text should be changed to 'DOWNLOAD'.