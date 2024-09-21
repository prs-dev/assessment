const fuelData = require("./response.json")
const fs = require('fs')

const data = (fuelData) => {
    let total = 0
    let fillEvents = []
    let baseLevel = fuelData[0].fuel_level
    for (let i = 1; i < fuelData.length; i++) {
        const currLevel = fuelData[i].fuel_level
        const prev = fuelData[i - 1]
        if (currLevel > baseLevel) {
            fillEvents.push({
                fuel_filled: currLevel - baseLevel,
                location: { latitude: prev.location.latitude, longitude: prev.location.longitude },
                start_time: prev.timestamp,
                end_time: fuelData[i].timestamp
            })
        } else {
            total = total + (baseLevel - currLevel)
        }
        baseLevel = currLevel
    }
    return JSON.stringify({ total, fillEvents })
}

fs.writeFile('./task-2/output/data.json', data(fuelData), (err) => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});
console.log(data(fuelData))

