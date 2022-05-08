const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')
const messageThree = document.querySelector('#message_3')
const messageFour = document.querySelector('#message_4')


weatherform.addEventListener('submit',(e)=> {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.foreCast
                messageThree.textContent = data.weatherIcon
                messageFour.textContent = data.observation_time
            }            
        })
    })
    
})