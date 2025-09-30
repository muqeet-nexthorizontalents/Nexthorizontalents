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
