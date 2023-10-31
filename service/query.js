const query = (db) => {
  const get_price_plans = async () => {
    return await db.manyOrNone(
      "SELECT plan_name, sms_price, call_price From price_plans"
    );
  };

  const insert_user = async (userName) => {
    return await db.none("INSERT INTO users (userName) VALUES ($1)", [
      userName,
    ]);
  };

  const get_plan_id = async (plan_name) => {
    return await db.oneOrNone(
      "SELECT ID FROM price_plans WHERE plan_name = $1",
      [plan_name]
    );
  };

  const get_user_id = async (userName) => {
    return await db.oneOrNone("SELECT userID FROM users WHERE userName = $1", [
      userName,
    ]);
  };

  const allocate_user_to_plan = async (userName, planId) => {
    return await db.none("UPDATE users SET planId = $1 WHERE userName = $2", [
      planId,
      userName,
    ]);
  };

  const link_user_to_usage = async (userID, usage) => {
    return await db.none("UPDATE user_usage SET userID = $1 WHERE usage = $2", [
      userID,
      usage,
    ]);
  };

  const calculate_usage = async (userName, usage) => {
    await db.none("INSERT INTO user_usage (usage) VALUES ($1)", [usage]);
    const plan_cost = await db.oneOrNone(
      "SELECT sms_price, call_price FROM price_plans INNER JOIN users ON users.planId = price_plans.ID WHERE users.userName = $1",
      [userName]
    );
    console.log("Plan Cost:", plan_cost)

   
  };

  return {
    get_user_id,
    insert_user,
    get_plan_id,
    get_price_plans,
    allocate_user_to_plan,
    link_user_to_usage,
    calculate_usage,
  };
};
export default query;
