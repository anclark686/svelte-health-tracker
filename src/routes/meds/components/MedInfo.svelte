<script>
import {
  onAuthStateChanged
} from "firebase/auth";
import {
  doc,
  getDocs,
  query,
  collection
} from "firebase/firestore";

import {
  auth,
  db
} from "../../../firebase";

let loading = true
let userLoggedIn = false
let uid = null
let medData = []

export const getMedsFromDB = async () => {
  const data = []
  const q = query(collection(db, `users/${uid}/meds`), );
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

onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    userLoggedIn = true
    const response = await getMedsFromDB().then(data => {
      medData = data
      loading = false
      console.log("Med Data: ", data)
    })
  } else {
    userLoggedIn = false
  }
});
const todo = "***TODO***"
</script>

<div class="med-info-container content-box">
    <h2 class="content-header">Medication Info</h2>
    <div class="med-info">
        <h3>Medication List</h3>
        {#if !loading}
        <table class="med-table">
            <thead class="med-table-header">
                <tr>
                    <th>Name</th>
                    <th>Dosage</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {#each medData as med, i}
                <tr class={i % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{med.name}</td>
                    <td>{med.dose}</td>
                    <td>{med.time}</td>
                </tr>
                {/each}
            </tbody>
        </table>
        {/if}
    </div>
</div>

<style>
.med-table {
  width: 75%;
  margin: 30px auto;
  color: var(--text-color);
  border-collapse: collapse;
}

.med-table-header {
  background-color: var(--table-header);

}

.odd-row {
  background-color: var(--table-every-other);
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 2px solid var(--text-color);
}
</style>
