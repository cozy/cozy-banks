// Map instance for categories

/*
  Categories
*/

const kids = {
  name: 'kids',
  color: '#1FA8F1'
}

const dailyLife = {
  name: 'dailyLife',
  color: '#FD7461'
}

const educationAndTraining = {
  name: 'educationAndTraining',
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

const activities = {
  name: 'activities',
  color: '#FC4C83'
}

const excludeFromBudgetCat = {
  name: 'excludeFromBudgetCat',
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

const goingOutAndTravel = {
  name: 'trips',
  color: '#40DE8E'
}

const uncategorized = {
  name: 'uncategorized',
  color: '#95999D'
}

export const categoriesMap = new Map([
  ['children_activities', kids],
  ['pocket_money', kids],
  ['school_insurance', kids],
  ['child-care', kids],
  ['toys', kids],
  ['child_support', kids],
  ['school_restaurant', kids],
  ['children_others', kids],

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

  ['lessons', educationAndTraining],
  ['school_fees', educationAndTraining],
  ['education_supplies', educationAndTraining],
  ['student_load_refund', educationAndTraining],
  ['education_others', educationAndTraining],

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

  ['activities_subscription', activities],
  ['activities_lessons', activities],
  ['electronic', activities],
  ['activities_supplies', activities],
  ['multimedia', activities],
  ['hobbies', activities],
  ['activities_others', activities],

  ['security_purchases', excludeFromBudgetCat],
  ['security_sales', excludeFromBudgetCat],
  ['advances', excludeFromBudgetCat],
  ['refunds', excludeFromBudgetCat],
  ['releasings', excludeFromBudgetCat],
  ['expenses_bill', excludeFromBudgetCat],
  ['deferred_debit', excludeFromBudgetCat],
  ['saving_transfer', excludeFromBudgetCat],
  ['internal_transfer', excludeFromBudgetCat],
  ['out-budget_others', excludeFromBudgetCat],

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

  ['trips_transportation', goingOutAndTravel],
  ['restaurants', goingOutAndTravel],
  ['cultural_trips', goingOutAndTravel],
  ['relaxation_trips', goingOutAndTravel],
  ['journeys', goingOutAndTravel],
  ['trips_others', goingOutAndTravel],

  ['cheques', uncategorized],
  ['withdrawals', uncategorized],
  ['uncategorized_transfers', uncategorized],
  ['uncategorized_others', uncategorized]
])

export default categoriesMap
