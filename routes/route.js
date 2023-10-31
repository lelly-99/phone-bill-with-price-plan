export default function main(data) {
  async function getMainRoute(req, res) {
    try {
     res.render('index')
    } catch (err) {
      console.log("error", err);
    }
  }

  async function postCalculateBill(req, res) {
    try {
      const name = req.body.name
      const use = req.body.usage
      //insert usage into database
  
      //link existing user with usage
      const userID = await data.get_user_id(name);
      await data.link_user_to_usage(userID, use);
      //calculate usage total based on plan
      const calculate = await data.calculate_usage(name, use);
      res.render('index', {calculate})
    } catch (err) {
      console.log("Error", err);
    }
  }
  async function getPricePlans(req, res) {
    try {
      const pricePlans = await data.get_price_plans();
    res.render("price_plans", { pricePlans })
    } catch (err) {
      console.log('Error', err)
  }
  }
  async function getPricePlansId(req, res) {
    try {
      const id = req.params.id;
      res.render('users', {id})
    } catch (err) {
      console.log('Error reseting app', err)
  }
  }
   async function getLinkUser(req, res) {
    try {
      res.render('link_user')
    } catch (err) {
      console.log('Error linking user', err)
  }
  }
   async function postLinkUser(req, res) {
    try {
      const insert_user_for_allocation = req.body.allocate_user_name
      const select_plan = req.body.price_plans
      //insert user into database
      await data.insert_user(insert_user_for_allocation)
      //get plan id from price plan body
      const get_plan_id_query = await data.get_plan_id(select_plan)
      //allocate user to plan
      await data.allocate_user_to_plan(insert_user_for_allocation, get_plan_id_query.id)
      //render the linked user to users
      res.render('users', {insert_user_for_allocation})
    } catch (err) {
      console.log('Error generating allocate page', err)
  }
  } 
  return {
   getMainRoute,
   postCalculateBill,
   getPricePlans,
   getPricePlansId,
   getLinkUser,
   postLinkUser, 
  };
}




