var timediff = require('timediff')

function calculateTimeDifferent(oldDate, newDate) {  
    return timediff(oldDate,newDate,'S')['seconds']
}

exports.calculateTimeDifferent=calculateTimeDifferent