document.addEventListener("DOMContentLoaded", function() {
    let btn = document.querySelector(".button");
    let qr_code_element = document.querySelector(".qr-code");
    let download_link = document.getElementById("download_link");
    let invalid_input_message = document.getElementById("invalid_input_message");
  
    btn.addEventListener("click", () => {
      let user_input = document.querySelector("#input_text").value.trim();
      if (isURL(user_input)) {
        generateQRCode(user_input);
        invalid_input_message.style.display = "none";
      } else {
        console.log("Invalid input");
        qr_code_element.style.display = "none"; // Hide the container after setting the message
        download_link.style.display = "none";
        invalid_input_message.style.display = "block";
      }
    });
  
    function generateQRCode(inputValue) {
      // Clear previous QR code and reset styles
      qr_code_element.innerHTML = "";
      qr_code_element.style.display = "block";
      download_link.style.display = "block";
  
      // Generate QR code
      let qrcode = new QRCode(qr_code_element, {
        text: inputValue,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
  
      // Set the href attribute for the download link
      setTimeout(() => {
        download_link.href = qr_code_element.querySelector("canvas").toDataURL();
      }, 300);
    }
  
    // Function to check if a given string is a URL
    function isURL(str) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      return urlPattern.test(str);
    }
  
    // Initial generation with a sample value
    generateQRCode("https://codepen.io/coding_dev_");
  });
  