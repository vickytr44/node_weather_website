
import request from 'postman-request';

const geocode =(address, callback) =>{
    const url ='http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoidmlja3JhbWFuIiwiYSI6ImNsMjNmdHkxdDFwbjUzY281bGY3dnQ5M2wifQ.4HjHAs20BAsRQycxofMRGw&limit=1'

    request({url, json: true}, (error,{body} ={}) =>{
            if(error)
            {
                callback('unable to connect to derver',undefined)
            } 
            else if (body.features.length === 0)
            {
                callback('unable to find location',undefined)
            }
            else
            {
                callback(undefined,{
                        latitude: body.features[0].center[0],
                        longitude:body.features[0].center[1],
                        location: body.features[0].place_name
                } )
            }
    })
}

export default {
    geoCode : geocode
}