import { galleryItems } from './gallery-items.js';
import 'https://cdn.jsdelivr.net/npm/basiclightbox@5.0.1/dist/basicLightbox.min.js';

const gallery = document.querySelector('.gallery');

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

document.addEventListener('DOMContentLoaded', function () {
  renderGallery();

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
  });
});
