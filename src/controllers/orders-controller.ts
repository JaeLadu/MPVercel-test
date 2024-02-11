import { firestoreDB } from "src/lib/firestore";

export async function createOrder(data) {
    console.warn('createOrder')
   return await firestoreDB.collection("orders").add({ data });
}

export async function updateOrderStatus(id: string, status: string) {
   await firestoreDB.collection("orders").doc(id).update({ status });
}
