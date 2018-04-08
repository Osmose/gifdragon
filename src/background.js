/* global Category */

(async function() {
  const categories = await Category.getAll();
  categories.forEach(category => category.addMenu());
})();
