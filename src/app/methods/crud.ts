import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

interface User {
    id?: string;   // Make id optional for creation
    name: string;
    email: string;
    phone: string;
}

const userRef = collection(db, "tiktok");

export async function getUsers() : Promise<User[]> {
    try {
        const snapshot = await getDocs(userRef);
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
        return users;
    } catch (error : unknown) {
        console.error("Error fetching users:", error);
        throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function addUser(user : User): Promise<string> {
    try {
        const docRef = await addDoc(userRef, user);
        return docRef.id;
    } catch (error : unknown) {
        console.error("Error adding user:", error);
        throw new Error(`Failed to add user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function updateUser(user : User): Promise<void> {
    try {
        // Check if document exists first
        const docRef = doc(db, 'tiktok', user.id ?? '');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...updateData } = user;
        await updateDoc(docRef, updateData);
    } catch (error : unknown) {
        console.error(`Error updating user with ID ${user.id}:`, error);
        if (error instanceof Error && 'code' in error && error.code === 'not-found') {
            throw new Error(`User with ID ${user.id} not found`);
        }
        throw new Error(`Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function deleteUser(id : string): Promise<void> {
    try {
        // Check if document exists first
        const snapshot = await getDocs(userRef);
        const userExists = snapshot.docs.some(doc => doc.id === id);
        if (!userExists) {
            throw new Error(`User to be deleted not found`);
        }   
        const docRef = doc(db, 'tiktok', id);
        await deleteDoc(docRef);
    } catch (error : unknown) {
        console.error(`Error deleting user with ID ${id}:`, error);
        if (error instanceof Error && 'code' in error && error.code === 'not-found') {
            throw new Error(`User with ID ${id} not found`);
        }
        throw new Error(`Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}