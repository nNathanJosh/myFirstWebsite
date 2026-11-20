(() => {
  const items = Array.from(document.querySelectorAll("[data-gallery-item]"));
  const viewer = document.getElementById("photo-viewer");
  if (!items.length || !viewer || typeof viewer.showModal !== "function") return;

  const image = viewer.querySelector(".lightbox-image");
  const caption = document.getElementById("photo-caption");
  let current = 0;

  const showPhoto = (index) => {
    current = (index + items.length) % items.length;
    const item = items[current];
    image.src = item.href;
    image.alt = item.dataset.alt || "";
    caption.textContent = item.dataset.caption || "";
  };

  items.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      showPhoto(index);
      viewer.showModal();
    });
  });

  viewer.querySelector("[data-viewer-close]").addEventListener("click", () => viewer.close());
  viewer.querySelector("[data-viewer-previous]").addEventListener("click", () => showPhoto(current - 1));
  viewer.querySelector("[data-viewer-next]").addEventListener("click", () => showPhoto(current + 1));
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showPhoto(current - 1);
    if (event.key === "ArrowRight") showPhoto(current + 1);
  });
})();
