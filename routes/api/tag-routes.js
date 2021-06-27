const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
      through: [{model: ProductTag}],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
      through: [{model: ProductTag}],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new tag:
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag by its `id` value
  try {
    const updateTag = await Tag.update(
      {tag_name: req.body.tag_name},
      {where: {id: req.params.id}}
    );
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category:
router.delete('/:id', async (req, res) => {
  try {
    const byeTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!byeTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(byeTag);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
