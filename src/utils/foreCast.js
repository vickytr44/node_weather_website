
import request from 'postman-request';

const forecast =(latitude,longitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=6231f42aae197dc92c3e0ce41429effc&query='+longitude  + ',' +  latitude+ '&units=f'    
    console.log(latitude + ',' + longitude )
    console.log(url)
    request({url, json: true}, (error,{body} = {}) =>{
            if(error)
            {
                callback('unable to connect to server',undefined)
            } 
            else if (body.error)
            {
                callback(body.error,undefined)
            }
            else
            {
                callback(undefined,{
                    foreCast: "It is "+ body.current.weather_descriptions + ". The temp is " + body.current.temperature + " but it feels like " + body.current.feelslike
                } )
            }
    })
}

export default {
    foreCast : forecast
}