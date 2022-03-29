const { Pizza } = require('../models');

const pizzaController = {
    // GET /api/pizzas
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({ // populates the comments in the getAllPizza response
                path: 'comments',
                select: '-__v'
            })
            .select('-__v') // do not show the 'v' field in the response
            .sort({ _id: -1 }) // sort the responses to show the newest ones first 
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET /api/pizza/:id
    // get one pizza
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                // If no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id.' });
                    return;
                }
                res.json(dbPizzaData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST /api/pizzas
    // create pizza
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // PUT /api/pizzas/:id
    // update pizza by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate(
            { _id: params.id }, body,
            { new: true, runValidators: true }) // new:true must be included or else mongoose will return the original doc instead of the new doc with the udpated info
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id.' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE /api/pizzas/:id
    // delete pizza 
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id.' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;