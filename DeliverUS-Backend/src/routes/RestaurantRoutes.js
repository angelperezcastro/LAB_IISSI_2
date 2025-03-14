import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {
  // TODO: Include routes for restaurant described in the lab session README
  //Customer Functional Requirements FR1:
  app.route('/restaurants')
  .get(RestaurantController.index)
  .post(RestaurantController.create)

  //Customer Functional Requirements FR2:
  app.route('/restaurants/:restaurantId')
  .get(RestaurantController.show)

  //Owner Functional Requirements FR1:
  

  app.route('/restaurants/:restaurantId')
  .put(RestaurantController.update)

  app.route('/restaurants/:restaurantId')
  .delete(RestaurantController.destroy)
}
export default loadFileRoutes
