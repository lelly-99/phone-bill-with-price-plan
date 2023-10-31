export default function phoneBill() {

  function calculate_usage_string(usage){
    const usage_string = usage;
    const usage_array = usage_string.split(", ");
    const total_usage = 0;
  
    for (let i = 0; i < usage_array.length; i++) {
      if (usage_array[i].includes("call")) {
        total_usage += Number(plan_cost.call_price);
      } else if (usage_array[i].includes("sms")) {
        total_usage += Number(plan_cost.sms_price);
      }
    }
    return total_usage.toFixed(2);
  }

  return {
    calculate_usage_string,
  }
}