




const serach=document.querySelector('form');
const searchInput=document.querySelector('input')

const m1=document.querySelector('#m1')
const m2=document.querySelector('#m2')


serach.addEventListener('submit',(e)=>{
    e.preventDefault();

const location=searchInput.value

m1.textContent='Loading...'
m2.textContent='Loading...'

fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        

           

            m1.textContent=data.forecast;
            m2.textContent=data.location;
        
    })
})
})