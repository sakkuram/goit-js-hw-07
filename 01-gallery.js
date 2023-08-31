import { galleryItems } from './gallery-items.js';
import 'https://cdn.jsdelivr.net/npm/basiclightbox@5.0.1/dist/basicLightbox.min.js';

const gallery = document.querySelector('.gallery');
let currentModal;

function renderGallery() {
  galleryItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('gallery__item');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = item.original;

    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = item.preview;
    image.alt = item.description;
    image.setAttribute('data-source', item.original);

    link.appendChild(image);
    listItem.appendChild(link);
    gallery.appendChild(listItem);
  });
}

gallery.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('gallery__image')) {
    const largeImageUrl = e.target.dataset.source;
    openModal(largeImageUrl);
  }
});

function openModal(imageUrl) {
  const modalContent = `
    <div class="modal">
      <img src="${imageUrl}" alt="Full-size Image">
    </div>
  `;

  const modal = basicLightbox.create(modalContent);

  currentModal = modal;
  modal.show();

  document.addEventListener('keydown', closeModalOnEscape);
}

function closeModalOnEscape(e) {
  if (e.key === 'Escape' && currentModal) {
    currentModal.close();
    currentModal = null;
    document.removeEventListener('keydown', closeModalOnEscape);
  }
}

renderGallery();
