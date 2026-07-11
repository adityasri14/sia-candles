// ---------------------------------------------------------
// Renders the Instagram photo grid from instagram-photos.js.
// ---------------------------------------------------------

function renderInstagramGrid() {
  const grid = document.getElementById('insta-grid');
  if (!grid) return;
  instagramPhotos.forEach(src => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.innerHTML = `<img src="${src}" alt="">`;
    grid.appendChild(tile);
  });
}

document.addEventListener('DOMContentLoaded', renderInstagramGrid);
