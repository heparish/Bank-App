const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Find all Categories:
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Find one Category by it's id value:
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new category:
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}}
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});


// DELETE a category:
router.delete('/:id', async (req, res) => {
  try {
    const byeCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!byeCategory) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(byeCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
