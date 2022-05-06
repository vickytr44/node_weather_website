const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')


weatherform.addEventListener('submit',(e)=> {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = location
                messageTwo.textContent = data.foreCast
            }            
        })
    })
    
})