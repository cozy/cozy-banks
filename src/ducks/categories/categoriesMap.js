// Map instance for categories

/*
  Categories
*/

const children = {
  name: 'children',
  color: '#1FA8F1'
}

const dailyLife = {
  name: 'daily-life',
  color: '#FD7461'
}

const education = {
  name: 'education',
  color: '#FC6D00'
}

const health = {
  name: 'health',
  color: '#F62C2C'
}

const housing = {
  name: 'housing',
  color: '#FF962F'
}

const income = {
  name: 'income',
  color: '#35CE68'
}

const leasures = {
  name: 'leasures',
  color: '#FC4C83'
}

const outBudget = {
  name: 'out-budget',
  color: '#FF0D3D'
}

const services = {
  name: 'services',
  color: '#7F6BEE'
}

const taxes = {
  name: 'taxes',
  color: '#B449E7'
}

const transportation = {
  name: 'transportation',
  color: '#4DCEC5'
}

const trips = {
  name: 'trips',
  color: '#40DE8E'
}

const uncategorized = {
  name: 'uncategorized',
  color: '#95999D'
}

export const categoriesMap = new Map([
  ['children_activities', children],
  ['pocket_money', children],
  ['school_insurance', children],
  ['child-care', children],
  ['toys', children],
  ['child_support', children],
  ['school_restaurant', children],
  ['children_others', children],

  ['regular_shopping', dailyLife],
  ['pets', dailyLife],
  ['gifts', dailyLife],
  ['cosmetics', dailyLife],
  ['donations', dailyLife],
  ['clothing', dailyLife],
  ['telecom', dailyLife],
  ['personal_loan_refund', dailyLife],
  ['shopping', dailyLife],
  ['meals', dailyLife],
  ['press', dailyLife],
  ['daily_life_others', dailyLife],

  ['lessons', education],
  ['school_fees', education],
  ['education_supplies', education],
  ['student_load_refund', education],
  ['education_others', education],

  ['health_insurance', health],
  ['health_costs', health],
  ['health_refunds', health],
  ['health_others ', health],

  ['housing_insurance', housing],
  ['housing_costs', housing],
  ['water', housing],
  ['electricity', housing],
  ['rent', housing],
  ['furnitures', housing],
  ['mortgage_refund', housing],
  ['house_works', housing],
  ['housing_others', housing],

  ['allowances', income],
  ['gift_incomes', income],
  ['dividends', income],
  ['interests', income],
  ['pension', income],
  ['complementary_incomes', income],
  ['replacement_incomes', income],
  ['rental_incomes', income],
  ['salary', income],
  ['income_others', income],

  ['leasures_subscription', leasures],
  ['leasures_lessons', leasures],
  ['electronic', leasures],
  ['leasures_supplies', leasures],
  ['multimedia', leasures],
  ['hobbies', leasures],
  ['leasures_others', leasures],

  ['security_purchases', outBudget],
  ['security_sales', outBudget],
  ['advances', outBudget],
  ['refunds', outBudget],
  ['releasings', outBudget],
  ['expenses_bill', outBudget],
  ['deferred_debit', outBudget],
  ['saving_transfer', outBudget],
  ['internal_transfer', outBudget],
  ['out-budget_others', outBudget],

  ['home_help', services],
  ['financial_consulting', services],
  ['legal_consulting', services],
  ['bank_charges', services],
  ['post', services],
  ['services_others', services],

  ['social_contributions', taxes],
  ['income_tax', taxes],
  ['wealth_tax ', taxes],
  ['property_tax', taxes],
  ['taxes_others', taxes],

  ['car_purchase', transportation],
  ['car_insurance', transportation],
  ['fuel', transportation],
  ['vehicle_maintenance', transportation],
  ['garage', transportation],
  ['vehicle_rental', transportation],
  ['parking_costs', transportation],
  ['vehicle_loan_refund', transportation],
  ['taxi', transportation],
  ['public_transportation', transportation],
  ['transportation_others', transportation],

  ['trips_transportation', trips],
  ['restaurants', trips],
  ['cultural_trips', trips],
  ['relaxation_trips', trips],
  ['journeys', trips],
  ['trips_others', trips],

  ['cheques', uncategorized],
  ['withdrawals', uncategorized],
  ['uncategorized_transfers', uncategorized],
  ['uncategorized_others', uncategorized]
])

export default categoriesMap
