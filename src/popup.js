/* global Category Masonry */

const categoryList = document.querySelector('#categories');

function createCategoryLi(category) {
  const li = document.createElement('li');
  li.className = 'category';
  li.dataset.id = category.id;

  const nameSpan = document.createElement('span');
  nameSpan.className = 'name';
  nameSpan.textContent = category.name;
  nameSpan.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameSpan.blur();
    }
  });
  nameSpan.addEventListener('blur', async () => {
    if (nameSpan.isContentEditable) {
      category.name = nameSpan.textContent;
      await category.save();

      nameSpan.contentEditable = "false";
    }
  });

  const editButton = document.createElement('a');
  editButton.href = '#';
  editButton.textContent = 'Edit'
  editButton.className = 'edit-button';
  editButton.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    nameSpan.contentEditable = "true";
    nameSpan.focus();
  });

  const deleteButton = document.createElement("a");
  deleteButton.href = '#';
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('mousedown', async event => {
    event.preventDefault();
    event.stopPropagation();
    const doDelete = window.confirm(`Are you sure you want to delete ${category.name}?`);
    if (doDelete) {
      await category.delete();
      li.remove();
    }
  })

  li.appendChild(nameSpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  li.addEventListener('click', handleClickCategory);

  return li;
}

(async function() {
  const categories = await Category.getAll();
  for (const category of categories) {
    categoryList.appendChild(createCategoryLi(category));
  }
})();

const addCategoryButton = document.querySelector('#add-category');
addCategoryButton.addEventListener('click', async event => {
  event.preventDefault();

  const category = await Category.create('Untitled Category');
  categoryList.appendChild(createCategoryLi(category));
});

/*
 * Image page
 */
const imagePage = document.querySelector('#page-images');
const imagePageTitle = document.querySelector("#page-images .title");
const imagePageBack = document.querySelector("#images-back");
const imageList = document.querySelector('#images');

imagePageBack.addEventListener('click', event => {
  event.preventDefault();
  imagePage.classList.remove('in-view');
});

async function handleClickCategory(event) {
  const id = event.target.closest('.category').dataset.id;
  const category = await Category.getById(id);
  if (!category) {
    return;
  }

  imagePageTitle.textContent = category.name;

  while (imageList.hasChildNodes()) {
    imageList.removeChild(imageList.lastChild);
  }

  const imgPromises = [];
  for (const url of category.urls) {
    const img = document.createElement('img');
    imgPromises.push(new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
    }));
    img.src = url;
    imageList.appendChild(img);
  }

  const masonry = new Masonry(imageList, {
    itemSelector: 'img',
    columnWidth: 200,
  });
  imgPromises.forEach(promise => promise.then(() => masonry.layout()));

  imagePage.classList.add('in-view');
}
