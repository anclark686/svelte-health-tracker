<script>
import {
  onAuthStateChanged
} from "firebase/auth";
import {
  addDoc,
  getDocs,
  query,
  collection,
  orderBy
} from "firebase/firestore";

import {
  auth,
  db
} from "../../firebase";
import {
  getDataFromDB
} from "../../lib/firebase_functions"
import {
  getBasicData
} from "../../lib/helper_functions";
import PageHeader from "../../components/PageHeader.svelte";
import LoadingSpinner from "../../components/LoadingSpinner.svelte";
import MedInfo from "./components/MedInfo.svelte";
import AddMed from "./components/AddMed.svelte";

const mainImage = "../src/assets/pills.svg"

let loading = true
let userLoggedIn = false
let uid = null
let medData = []
let showModal = false;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    userLoggedIn = true
    console.log("UID: ", uid)
    const response = await getMedsFromDB().then(data => {
      medData = data
      loading = false
      console.log("Med Data: ", data)
      console.log("done", medData)
    })
  } else {
    userLoggedIn = false
    loading = false
  }
});

const getMedsFromDB = async () => {
  const data = []
  const q = query(collection(db, `users/${uid}/meds`), orderBy("name"));
  const medSnapshot = await getDocs(q);
  medSnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    data.push({
      ...doc.data(),
      id: doc.id
    })
  });
  return data
}

const hideForm = async (e) => {
  showModal = false
  loading = true
  const response = await getMedsFromDB().then(data => {
      medData = data
      loading = false
      console.log("Med Data: ", data)
      console.log("done", medData)
    })
}

const addNewMed = async (e) => {
  console.log(e)
  console.log("adding new med")
  const uid = auth.currentUser.uid
  console.log(uid)

  const {
    name,
    dose,
    time
  } = getBasicData(e)

  const docRef = await addDoc(collection(db, `users/${uid}/meds`), {
    name : name.toLowerCase(),
    dose,
    time,
    uid: uid
  });
  console.log(name, dose, time)
  hideForm()
}
</script>

<main>
    <PageHeader title="Medication Tracker" dashboard={true} other={{}} />
    {#if loading}
    <LoadingSpinner />
    {:else}
    <div class="meds-content">
        <img src="{mainImage}" alt="exercise" class="page-image">
        <div class="btn-container">
            <button class="btn" on:click={() => {showModal = true; console.log(showModal);}}>+ Add New</button>
        </div>
        <MedInfo medData={medData} />
            <AddMed bind:showModal addNewMed={addNewMed} />
            </div>
            {/if}
            </main>

<style>
.meds-content {
  text-align: center;
}
</style>
