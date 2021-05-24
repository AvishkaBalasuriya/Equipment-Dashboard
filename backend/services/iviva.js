const axios = require('axios')
const config = require('config')

async function getEquipmentData(){
    try{
        let data = []
        let lastId = 0
        while(lastId!==false){
            console.log("Fetching data",lastId)
            var apiConfig = {
                method: 'get',
                url: `${config.get("iviva.host")}?apikey=${config.get("iviva.apiKey")}&max=${config.get("iviva.pageSize")}&last=${lastId}`,
            }
            let response = await axios(apiConfig).catch((e)=>{
                return {success:false,code:200,error:e.message,data:null}
            })
            if(response.data.length==0){
                lastId=false
                break
            }
            data=data.concat(response.data)
            lastId=response.data[response.data.length-1].__rowid__
        }
        return {success:true,code:200,error:null,data:data}
    }catch(e){
        return {success:false,error:e.message,code:500,data:null}
    }
}

exports.getEquipmentData=getEquipmentData