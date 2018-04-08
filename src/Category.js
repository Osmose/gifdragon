/* exported Category */

class Category {
  static async getAll() {
    const {categories = {}} = await browser.storage.local.get('categories');
    return Object.entries(categories).map(([id, data]) => new Category(id, data));
  }

  static async getById(id) {
    const {categories = {}} = await browser.storage.local.get('categories');
    const data = categories[id];
    if (data) {
      return new Category(id, data);
    }

    return null;
  }

  static async create(name) {
    const categories = await Category._getStored();
    const id = Math.max(0, ...Object.keys(categories)) + 1
    const data = {
      name,
      urls: [],
    };
    categories[id] = data;
    await browser.storage.local.set({categories});

    const category = new Category(id, data);
    await category.addMenu();
    return category;
  }

  static async _getStored() {
    const {categories = {}} = await browser.storage.local.get('categories');
    return categories;
  }

  constructor(id, {name, urls}) {
    this.id = id;
    this.name = name;
    this.urls = urls;
    this._deleted = false;
  }

  async save() {
    if (this._deleted) {
      return;
    }

    const categories = await Category._getStored();
    categories[this.id].name = this.name;
    categories[this.id].urls = this.urls;
    await browser.storage.local.set({categories});
    await browser.menus.update(`save-${this.id}`, {title: `Save GIF to ${this.name}`})
  }

  async delete() {
    this._deleted = true;
    await this.removeMenu();
    const categories = await Category._getStored();
    delete categories[this.id];
    await browser.storage.local.set({categories});
  }

  async addMenu() {
    return browser.menus.create({
      id: `save-${this.id}`,
      title: `Save GIF to ${this.name}`,
      contexts: ['image'],
      onclick: async (info) => {
        this.urls.push(info.srcUrl);
        this.save();
      },
    });
  }

  async removeMenu() {
    return browser.menus.remove(`save-${this.id}`)
  }
}
