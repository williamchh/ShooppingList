const express = require('express')
const { check, validationResult } = require('express-validator/check')
const router = express.Router();

const ShoppingItem = require('../modals/ShoppingItem')

/// get shopping items list
/// GET api/spi
/// access public with 
router.get('/', async (req, res) => {
    try {
        const si = await ShoppingItem.find({});
        res.json(si);
    } catch (err) {
        res.status(500).json({ err: 'server error' });
    }
});

/// update shopping item to list
/// PUT api/spi/:id
/// access public with 
router.put('/:id',  async (req, res) => {
    console.log(req.params.id)
   
    const { name, price, unit, shop, info, check } = req.body;
    // build new item for updating
    const newShoppingItem = { name, price, unit, shop, info, check };

    try {
        let spi = await ShoppingItem.findById(req.params.id);

        if (spi) {
            
            spi = await ShoppingItem.findByIdAndUpdate(
                req.params.id,
                { $set: newShoppingItem },
                { new: true} )

                res.json(spi);
        }
        else{
            console.log("can not find object")
            res.status(404).json({ msg: "shopping item not found" });
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "shopping item not found" });
    }

});

/// ADD NEW shopping item check status
/// POST api/spi/
/// access public with 
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
] , async (req, res) => {
    
    const { name, price, unit, shop, info, check, category } = req.body;
    try {
        const newItem = new ShoppingItem({
            name, unit, category, shop, info, check, price: parseFloat(price)
        });
        console.log(newItem)
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.log('error not added ' + err)
        res.status(500).send("save shopping item error");
    }
});

/// delete shopping item 
/// DELETE api/spi/:id
/// access public with 
router.delete('/:id', async (req, res) => {
    try {
        let item = await ShoppingItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "item not found" });
        }

        await ShoppingItem.findByIdAndRemove(req.params.id);

        res.send(req.params.id);
    } catch (err) {
        return res.status(500).json({ msg: "server error" });
    }
});

module.exports = router;