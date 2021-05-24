const ivivaService = require('../services/iviva')

async function makeChartData(data){
    try{
        let chartData=[]
        let uniqueItems = {}
        let cardData={operational:0,nonOperational:0}
    
        data.forEach(equipement => {
            let categoryId = equipement.AssetCategoryID.toString()
            if(!(categoryId in uniqueItems))
                uniqueItems[categoryId]=0
            uniqueItems[categoryId]+=1

            if(equipement.OperationalStatus==="Operational")
                cardData.operational+=1
            else
                cardData.nonOperational+=1
        })
    
        for (let [key, value] of Object.entries(uniqueItems)) {
            chartData.push({
                name:key,
                count:value
            })
        }
    
        return {chartData,cardData}
    }catch(e){
        return null
    }
}

exports.makeChartData=makeChartData