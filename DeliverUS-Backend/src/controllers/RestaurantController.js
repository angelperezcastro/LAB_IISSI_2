import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const create = async function (req, res) {
  const newRestaurant = Restaurant.build(req.body)
  newRestaurant.userId = 1
  try {
    const restaurant = await newRestaurant.save()
    res.json(restaurant)
  } catch (err) {
      res.status(500).send(err)
  }

}

const show = async function (req, res){
  const restaurant = await Restaurant.findByPk(req.params.restaurantId, {
    attributes: { exclude: ['userId'] },
    include: [{
      model: Product,
      as: 'products',
      include: { model: ProductCategory, as: 'productCategory' }
    },
    {
      model: RestaurantCategory,
      as: 'restaurantCategory'
    }],
    order: [[{model:Product, as: 'products'}, 'order', 'ASC']],
  }
  )
  try{
    res.json(restaurant)
  }catch(err){
    res.status(500).send(err)
  }
}

const update = async function (req, res) {
  const newRestaurant = Restaurant.build(req.body)
  newRestaurant.userId = 1
  try{
    const restaurant = await Restaurant.findByPk(req.params.restaurantId)
    await restaurant.update(req.body)
    res.json(restaurant)
  } catch(err){
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try{
    const restaurant = Restaurant.findByPk(req.params.restaurantId)
    const deletedCount = await Restaurant.destroy({
      where:{id:restaurant}
    });
    res.json({message: 'Succesfully deleted restaurant with ID: ${restaurant}'})
  }catch(err){
    res.status(500).send(err)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
