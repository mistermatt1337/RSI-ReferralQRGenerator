// Content.js

import QRCode from 'easyqrcodejs';

document.getElementById('actionButton').addEventListener('click', function(event) {
        let buttonText = event.target.textContent.toUpperCase();
        if (buttonText.startsWith('GENERATE')) {
            generateQR(event.target);
        } else if (buttonText.startsWith('DOWNLOAD')) {
            downloadQR(event.target);
        } else if (buttonText.startsWith('RESET')) {
            location.reload();
        }
    });
    referallBase = 'https://robertsspaceindustries.com/?referral=';
    async function generateQR(button) {
        let input = document.getElementById('referralCode').value.toUpperCase();
        let match = input.match(/STAR-\w{4}-\w{4}/i);
        if (match) {
            let data = match[0];
            let url = referallBase + data;
            let options = {
                drawer: 'svg',
                size: 256,
                logo: await getLogoUrl(),
                logoWidth: 64,
                logoHeight: 64,
                logoBackgroundColor: '#ffffff',
                logoBackgroundTransparent: false,
                backgroundImage: await getBackgroundUrl(),
                backgroundImageAlpha: 0.5,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
                text: url,
                tooltip: true,
            };
            console.log(options);
            let qrcode = new QRCode(document.getElementById("qrcode"), options);
            document.getElementById('outputData').style.display = 'block';
            document.getElementById('referralCode').disabled = true;
            document.getElementById('logoInput').disabled = true;
            document.getElementById('backgroundInput').disabled = true;

            button.textContent = 'DOWNLOAD';
        } else {
            // Create a new notification element
            let notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'Invalid input. Please enter a referral code in the format STAR-XXXX-XXXX.';
            // Add the notification to the DOM
            document.body.appendChild(notification);
            // Remove the notification after 5 seconds
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 5000);
        }
    }
    function downloadQR(button) {
        let qrcode = document.getElementById('qrcode');
        let canvas = qrcode.querySelector('canvas');
        let svg = qrcode.querySelector('svg');
    
        if (canvas) {
            let canvasData = canvas.toDataURL('image/png');
            let a = document.createElement('a');
            a.download = 'qrcode.png';
            a.href = canvasData;
            a.click();
        } else if (svg) {
            let svgData = new XMLSerializer().serializeToString(svg);
            let a = document.createElement('a');
            a.download = 'qrcode.svg';
            a.href = 'data:image/svg+xml;base64,' + btoa(svgData);
            a.click();
        } else {
            console.error('Neither canvas nor SVG element found');
        }
    
        // Change the button text after a successful download
        button.textContent = 'RESET';
    }
    function getLogoUrl() {
        let logoInput = document.getElementById('logoInput');
        if (logoInput.files.length > 0) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(logoInput.files[0]);
            });
        } else {
            return Promise.resolve(null); // No logo
        }
    }
    
    function getBackgroundUrl() {
        let backgroundInput = document.getElementById('backgroundInput');
        if (backgroundInput.files.length > 0) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(backgroundInput.files[0]);
            });
        } else {
            return Promise.resolve(null); // No background
        }
    }
    document.getElementById('aboutButton').addEventListener('click', function() {
        openModal();
    });
    function openModal() {
        console.log('openModal');
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.addEventListener('click', function() {
            closeModal(modal);
        });
        window.addEventListener('click', function(event) {
            closeOnOutsideClick(event, modal);
        });
    }
    function closeModal(modal) {
        modal.style.display = "none";
    }
    function closeOnOutsideClick(event, modal) {
        if (event.target == modal) {
            event.stopPropagation();
            modal.style.display = "none";
        }
    }
