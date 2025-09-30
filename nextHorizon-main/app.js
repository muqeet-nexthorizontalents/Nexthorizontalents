// Industries Dropdown Toggle
const industryToggle = document.getElementById("industryToggle");
const industriesMenu = document.getElementById("industriesMenu");

industryToggle.addEventListener("click", (e) => {
  e.preventDefault();
  industryToggle.classList.toggle("active");
  industriesMenu.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    industryToggle.classList.remove("active");
    industriesMenu.classList.remove("active");
  }
});

//  ========================================

// contact form submisssion logic

// app.js - Consolidated, Corrected, and CORS-adjusted for contact.html

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const firstnameInput = document.getElementById("firstname");
  const lastnameInput = document.getElementById("lastname");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const experienceInput = document.getElementById("experience");
  const previousJobInput = document.getElementById("previousJob");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  const firstnameErrorSpan = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbx7ncqwWwz0UdwGQ53mygzk1uzs3GMIRjM7PiCI_d3vqtZsQjIzRak-L51aZDoEHPQ0/exec";

  function validateField(
    inputElement,
    errorMessageElement,
    validationFn,
    errorMessage
  ) {
    if (!inputElement) return true;

    const value = inputElement.value.trim();
    if (!validationFn(value)) {
      if (errorMessageElement) errorMessageElement.textContent = errorMessage;
      inputElement.style.borderColor = "#ef4444";
      return false;
    }
    if (errorMessageElement) errorMessageElement.textContent = "";
    inputElement.style.borderColor = "#10b981";
    return true;
  }

  function isMinLength(value, min) {
    return value.length >= min;
  }

  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  if (firstnameInput) {
    firstnameInput.addEventListener("blur", () =>
      validateField(
        firstnameInput,
        firstnameErrorSpan,
        (val) => isMinLength(val, 2),
        "First Name must be at least 2 characters long"
      )
    );
  }

  if (emailInput) {
    emailInput.addEventListener("blur", () =>
      validateField(
        emailInput,
        emailError,
        isValidEmail,
        "Please enter a valid email address"
      )
    );
  }

  if (messageInput) {
    messageInput.addEventListener("blur", () =>
      validateField(
        messageInput,
        messageError,
        (val) => isMinLength(val, 10),
        "Message must be at least 10 characters long"
      )
    );
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 10) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
      e.target.value = value;
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const isFirstNameValid = validateField(
        firstnameInput,
        firstnameErrorSpan,
        (val) => isMinLength(val, 2),
        "First Name must be at least 2 characters long"
      );
      const isEmailValid = validateField(
        emailInput,
        emailError,
        isValidEmail,
        "Please enter a valid email address"
      );
      const isMessageValid = validateField(
        messageInput,
        messageError,
        (val) => isMinLength(val, 10),
        "Message must be at least 10 characters long"
      );

      const isLastNameValid = lastnameInput?.value.trim().length > 0;
      const isPreviousJobValid = previousJobInput?.value.trim().length > 0;

      if (
        isFirstNameValid &&
        isEmailValid &&
        isMessageValid &&
        isLastNameValid &&
        isPreviousJobValid
      ) {
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }

        try {
          await fetch(WEB_APP_URL, {
            method: "POST",

            body: new URLSearchParams(data),
          });

          showSuccessMessage(successMessage);
          contactForm.reset();
          [
            firstnameInput,
            lastnameInput,
            emailInput,
            phoneInput,
            experienceInput,
            previousJobInput,
            messageInput,
          ].forEach((input) => {
            if (input) input.style.borderColor = "#e2e8f0";
          });
        } catch (error) {
          console.error("Error during form submission:", error);
          alert(
            "There was an error connecting to the server. Please try again later."
          );
        } finally {
          submitBtn.innerHTML =
            '<i class="fas fa-paper-plane"></i> Send Message';
          submitBtn.disabled = false;
        }
      } else {
        alert("Please correct the errors in the form before submitting.");
      }
    });
  }

  function showSuccessMessage(messageElement) {
    if (messageElement) {
      messageElement.classList.add("show");
      setTimeout(() => {
        messageElement.classList.remove("show");
      }, 5000);
    }
  }
});

//

// discover jobs form

document.addEventListener("DOMContentLoaded", function () {
  const jobForm = document.getElementById("jobDiscoverForm");
  const submitBtn = document.getElementById("jobSubmitBtn");
  const successMessage = document.getElementById("successMessage");

  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbz5xdnEapd_S1fB3i_9VsFmvUOJz0K9uDT39m041ds94NK6rkgbRm1oD2PlGzt6sfj8/exec";
  if (jobForm) {
    jobForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(jobForm);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value.trim();
      }

      try {
        await fetch(WEB_APP_URL, {
          method: "POST",
          body: new URLSearchParams(data),
        });

        successMessage.classList.add("show");
        jobForm.reset();
        setTimeout(() => successMessage.classList.remove("show"), 5000);
      } catch (err) {
        console.error("Error submitting Discover Jobs form:", err);
        alert("Something went wrong. Please try again.");
      } finally {
        submitBtn.innerHTML =
          '<i class="fas fa-paper-plane"></i> Discover Jobs';
        submitBtn.disabled = false;
      }
    });
  }
});
