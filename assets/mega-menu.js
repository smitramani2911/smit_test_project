/**
 * AURVÉRA mega menu helpers, layered on Horizon's own header menu (assets/header-menu.js).
 *
 * - Closes an open menu panel when the visitor clicks or taps outside the menu,
 *   using the panel's own disclosure button so Horizon keeps managing state and focus.
 * - Uses Horizon's drawer menu below 990px wide. Horizon already switches to the drawer on touch
 *   devices and when the row runs out of space; this keeps narrow desktop windows consistent too.
 */

const DRAWER_QUERY = window.matchMedia('(max-width: 989px)');

/** @param {HTMLElement} header */
function syncMenuStyle(header) {
  if (DRAWER_QUERY.matches && header.dataset.menuStyle === 'menu') {
    header.dataset.menuStyle = 'drawer';
  }
}

function init() {
  const header = document.querySelector('#header-component');
  if (!(header instanceof HTMLElement)) return;

  syncMenuStyle(header);
  new MutationObserver(() => syncMenuStyle(header)).observe(header, {
    attributes: true,
    attributeFilter: ['data-menu-style'],
  });
  DRAWER_QUERY.addEventListener('change', () => syncMenuStyle(header));

  document.addEventListener(
    'pointerdown',
    (event) => {
      const menu = header.querySelector('header-menu');
      if (!menu || !(event.target instanceof Node) || menu.contains(event.target)) return;

      const openButton = menu.querySelector('.menu-list__disclosure[aria-expanded="true"]');
      if (openButton instanceof HTMLElement) openButton.click();
    },
    { passive: true }
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
