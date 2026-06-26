const imageUpload = document.querySelector("#image-upload");
const previewImage = document.querySelector("#preview-image");
const placeholder = document.querySelector("#placeholder");
const magnetPreview = document.querySelector("#magnet-preview");
const magnetShape = document.querySelector("#magnet-shape");
const captionInput = document.querySelector("#caption-input");
const previewCaption = document.querySelector("#preview-caption");
const resetPreview = document.querySelector("#reset-preview");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");

let objectUrl;

function updateCaption() {
  const caption = captionInput.value.trim();
  previewCaption.textContent = caption;
  previewCaption.hidden = caption.length === 0;
}

function resetImage() {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = undefined;
  }

  imageUpload.value = "";
  previewImage.hidden = true;
  previewImage.removeAttribute("src");
  placeholder.hidden = false;
  captionInput.value = "";
  updateCaption();
}

imageUpload.addEventListener("change", (event) => {
  const [file] = event.target.files;

  if (!file) {
    resetImage();
    return;
  }

  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }

  objectUrl = URL.createObjectURL(file);
  previewImage.src = objectUrl;
  previewImage.hidden = false;
  placeholder.hidden = true;
});

magnetShape.addEventListener("change", () => {
  magnetPreview.className = `magnet-preview ${magnetShape.value}`;
});

captionInput.addEventListener("input", updateCaption);
resetPreview.addEventListener("click", resetImage);

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});
