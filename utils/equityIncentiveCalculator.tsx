export default function equityIncentiveCalculator(MortgageAmount, HomePrice, DownPayment, AnnualIncome, PropertyType){
    if(AnnualIncome > 120000 ){
        return 'You are ineligible for the Government Shared-Equity Incentive because your household income exceeds $120,000.'
    }
    if(MortgageAmount > (4*AnnualIncome)){
        return 'You are ineligible for the Government Shared-Equity Incentive because your mortgage amount (purchase price minus down payment) of $' + Math.round(MortgageAmount) + ' exceeds four times your annual household income.'
    }
    if(HomePrice > 600000){
        return 'You are ineligible for the Government Shared-Equity Incentive because your asking price is $600,000 or higher.'
    }
    if(DownPayment >= 20){
        return 'You are ineligible for the Government Shared-Equity Incentive because your down payment is 20% or higher'
    }
    if(PropertyType){
        return (Math.round((10/100)*HomePrice))
    }
    return (Math.round((5/100)*HomePrice))

}