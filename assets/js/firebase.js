
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore,collection, addDoc, getDocs, doc, deleteDoc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAQuHtbJNodIpMbU42d7s-iy5U0oNf4EHA",
    authDomain: "events-c44df.firebaseapp.com",
    projectId: "events-c44df",
    storageBucket: "events-c44df.appspot.com",
    messagingSenderId: "200978686633",
    appId: "1:200978686633:web:253b6ff407409761d6ffb8"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

function alertConfirmation () {
    Swal.fire({
        icon: 'success',
        title: 'Evento criado com sucesso',
        html: '<p class="text-modal">confira sua seus eventos em <b>"Gerenciamento de eventos"</b></p>',
        timer: 5000
    })
}

export const onSnapshotEvent = (callback) => onSnapshot(collection(db, "events"), callback);

export const setImageToStorage = (fileImage, nameImage) => {
    const imageRef = ref(storage, `${nameImage}`)
    uploadBytes(imageRef, fileImage)
        .then((snapshot) => {
            
        });
}


export const setDataEvent = async (name, local, data, description, nameImage) => {
    try {
        const docRef = await addDoc(collection(db, "events"), {
            name,
            local,
            data,
            description,
            nameImage
        })
          alertConfirmation()
        } catch (e) {
        alert('erro ao criar evento')
        console.log(e)
      }
}

// get data events


export const getDataEvent = () => getDocs(collection(db, "events"));

export const getDataImage = async (docImage) => {
    try {
        const imageRef = await ref(storage, `${docImage}`);
        const url = await getDownloadURL(ref(storage, imageRef))
        return url
    } catch (error) {
        console.log(error)
    }
}

export const deleteEventDoc = async (docId) => {
    try {
        await deleteDoc(doc(db, "events", docId));
        location.reload()
        
    } catch (error) {
        alert('erro ao deletar evento')
        console.log(error)  
    }
}