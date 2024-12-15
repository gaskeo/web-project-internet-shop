import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  projectId: 'web-project-internet-shop',
  apiKey: 'AIzaSyAMk4sPLzJbT8dRSyJzar6wP_vlcGcpaIU'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
