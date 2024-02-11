import { firestoreDB } from "src/lib/firestore";
const ordersRef = firestoreDB.collection("orders");

export async function updateOrderStatus(id: string, status: string) {
   await ordersRef.doc(id).update({ status });
}
