
import { getDataEvent, getDataImage, deleteEventDoc, onSnapshotEvent } from "./firebase.js";


// const putInHTML = (doc, url) => {
//     const boxEvent = document.createElement('div')
//     boxEvent.classList.add('box-event')
//     const { name, data, local, description, image } = doc.data()
    
//     boxEvent.innerHTML = `
//     <div class="preview-event">
//     <div class="img-event"><img src="${url}" alt="${image}"></div>
//     <div class="date-event">
//         <h3>${name}</h3>
//             <div>
//                 <h5>data do evento</h5>
//                 <small>${data}</small>
//             </div>
//             <div>
//                 <h5>Local</h5>
//                 <small>${local}</small>
//         </div>
//         <div>
//             <h5>Descrição</h5>
//             <p>${description}</p>
//             </div>
//         </div>
//     </div>
//     <button data-id="${doc.id}" id="btnDelete" >deletar evento</button>
//     `
//     removePreload(boxEvent)

//     const deleteDoc = (e) => {
//         if(e.target.type){
//             const docId = e.target.dataset.id
//             removeDoc(docId)
//         }
//     }
//     boxEvent.addEventListener('click', deleteDoc)
// }


const updateScreen = (doc) => {
    getDataImage(doc.data().nameImage, doc )
        .then(url => {
            putInHTML(doc, url)
        })   
    }
    
    const putInHTML = (doc, url) => {
        const boxEvent = document.createElement('div')
        boxEvent.classList.add('box-event')
        const { name, data, local, description, imageName } = doc.data()
        
        boxEvent.innerHTML = `
        <div class="preview-event">
    <div class="img-event"><img src="${url}" alt="${imageName}"></div>
    <div class="date-event">
    <h3>${name}</h3>
    <div>
    <h5>data do evento</h5>
    <small>${data}</small>
    </div>
    <div>
    <h5>Local</h5>
    <small>${local}</small>
    </div>
    <div>
    <h5>Descrição</h5>
    <p>${description}</p>
    </div>
    </div>
    </div>
    <button data-id="${doc.id}" id="btnDelete" >deletar evento</button>
    `
    setTimeout(() => {
        if(!boxEvent.innerHTML == ''){
            document.querySelector('.loading').style.display = 'none';
            document.querySelector('.main-allEvents').append(boxEvent)
        }
    }, 1600);
}

const init = () => {
    onSnapshotEvent((querySnapshot) => {
        if(querySnapshot.docs.length == 0){
            document.querySelector('.loading').style.display = 'none';
            document.querySelector('.message-empty').style.display = 'flex';
        }
        querySnapshot.forEach(doc => {
            updateScreen(doc)
        });
    })
    
}

function confirmDelete (docId) {
    Swal.fire({
        title: 'Você tem certeza disso ?',
        text: "esses dados não poderão ser recuperados!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, eu quero deletar!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteEventDoc(docId)
          Swal.fire(
            'Deletado!',
            'seu evento foi deletado',
            'success'
          )
        }
    }
)}


const deleteEvent = (e) => {
    if(e.target.type){
        const docId = e.target.dataset.id
        confirmDelete(docId)
    }
}

window.addEventListener('DOMContentLoaded', init)
document.querySelector('main').addEventListener('click', deleteEvent)