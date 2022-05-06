import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path';
import hbs from 'hbs';
import geoCode from './utils/geoCode.js'
import foreCast from './utils/foreCast.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
//Define paths
const viewspath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handle bars and view location 
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title: "weather app",
        name: 'vicky'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: "about",
        name: 'vicky'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: "help",
        name: 'vicky'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'provide address term'
        })
    }
    
    geoCode.geoCode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        //console.log(city)
        if(error)
        {
            return res.send({
                error: error,
                errorMessage: 'provide proper address term'
            })
        }

        //console.log(location)
        foreCast.foreCast(latitude, longitude, (forecasterror, {foreCast} = {}) =>{
            if(forecasterror)
            {
                return res.send({
                    error: JSON.stringify(forecasterror)
                })
            }
            //console.log(temperature,feelslike)
            res.send({                
                foreCast,
                location,
                address: req.query.address

            })
            
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: "help",
        name: 'vicky',
        error: "help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: "Weather",
        name: 'vicky',
        error: "page not found"
    })
})

app.listen(3000, () => {
    console.log('server is up on 3000')
})