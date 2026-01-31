import { SERVICES } from "./services.js";

export function calculateCommission(service, amount){
  const rules = SERVICES[service];
  if(!rules) throw "Invalid Service";

  let result = {};
  let total = 0;

  for(let key in rules){
    let share = amount * (rules[key]/100);
    result[key] = Math.round(share);
    total += result[key];
  }

  result.check = total === amount ? "OK" : "Adjusted";
  return result;
}
