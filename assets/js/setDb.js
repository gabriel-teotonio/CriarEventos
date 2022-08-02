
import { setDataEvent, setImageToStorage, onSnapshotEvent } from "./firebase.js";

const inputName = document.querySelector('#nomeEvento')
const inputDate = document.querySelector('#dataEvento')
const inputLocal = document.querySelector('#localEvento')
const inputDecription = document.querySelector('#descriptionEvento')

const form = document.querySelector('form')
let fileImage;
let nameImage;
let imageURL;

function getImageUrl (e) {
    const file = document.querySelector('#imageEvent').files[0]
    const reader = new FileReader();
    nameImage = file.name
    fileImage = file
    
    reader.addEventListener('load', () => {
        imageURL = reader.result
    })
    if(file){
        reader.readAsDataURL(file);
    }
}


const setDataImage = () => {
    setImageToStorage(fileImage, nameImage)
}

const setDatasEventDb = (e) => {
    e.preventDefault()
    setDataImage()
    setDataEvent(inputName.value,inputLocal.value,inputDate.value,inputDecription.value, nameImage)
    form.reset()
}



form.addEventListener('submit', setDatasEventDb)
document.querySelector('#imageEvent').addEventListener('change', getImageUrl)