export default function calculateLandTax(HomePrice: string){
    let homePrice = parseInt(HomePrice)
    let tax = 0
    if (isNaN(homePrice)){
        return 0
    }
    if (homePrice >= 55000){
        tax += 55000 * (0.5/100)
    }
    else{
        tax += homePrice* (0.5/100)
    }
    if (homePrice > 55000){
        if (homePrice < 250000){
            tax += (homePrice-55000)*(1/100)
        }
        else{
            tax += ((195000)*(1/100))
        }
    }
    if(homePrice >= 250000){
        if ( tax+ ((homePrice-250000)*(1.5/100)) < 4000){
            tax += (homePrice-250000)*(1.5/100) 
        }
        else{
           return 4000
        }
    }
    return (Math.round(tax))

}