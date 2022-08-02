
const form = document.querySelector('form')
const inputName = document.querySelector('#nomeEvento')
const inputDate = document.querySelector('#dataEvento')
const inputLocal = document.querySelector('#localEvento')
const inputDecription = document.querySelector('#descriptionEvento')

const btnPreview = document.querySelector('#btnPreview')
const dateEvent = document.querySelector('.date-event')

const previewInputDates = () => {
    dateEvent.innerHTML = `
    <h3>${inputName.value}</h3>
    <div>
        <h5>data do evento</h5>
        <small>${inputDate.value}</small>
    </div>
    <div>
        <h5>Local</h5>
        <small>${inputLocal.value}</small>
    </div>
    <div>
        <h5>Descrição</h5>
        <p class='description'>${inputDecription.value}</p>
    </div>
    `
}


function previewImage (e) {
    const file = document.querySelector('#imageEvent').files[0]
    const previewImage = document.querySelector(".img-event img");
    
    const reader = new FileReader();
    
    reader.addEventListener('load', () => {
        previewImage.src = reader.result
    })
    
    if(file){
        reader.readAsDataURL(file);
    }
}



form.addEventListener('focusout', previewInputDates)
document.querySelector('#imageEvent').addEventListener('change', previewImage)
