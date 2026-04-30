function updateActiveItem() {
  if (window.innerWidth >= 768) return;

  const items = document.querySelectorAll('.common-item');
  const centerY = window.innerHeight / 2;

  let closestItem = null;
  let closestDistance = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenterY = rect.top + rect.height / 2;
    const distance = Math.abs(itemCenterY - centerY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }
  });

  items.forEach(item => item.classList.remove('active'));
  if (closestItem) closestItem.classList.add('active');
}

window.addEventListener('scroll', updateActiveItem, { passive: true });
window.addEventListener('resize', updateActiveItem);
updateActiveItem();