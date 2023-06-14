/* eslint-disable import/named */
import { useMemo } from "react"

import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"

import { Chat, CreateChat } from "~/@types/chat"
import { db } from "~/firebase"

export const useFirestore = () => {
  const chatsCollectionRef = useMemo(() => {
    const chatConverter: FirestoreDataConverter<Chat | CreateChat> = {
      fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Chat {
        const data = snapshot.data(options)
        return {
          uid: snapshot.id,
          message: data.message,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        }
      },
      toFirestore(chat: CreateChat): DocumentData {
        return {
          ...chat,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      },
    }
    return collection(db, "rooms", "fukui-kosen", "chats").withConverter(chatConverter)
  }, [])

  const createChat = async (chat: CreateChat): Promise<void> => {
    await addDoc(chatsCollectionRef, chat)
  }

  const fetchChat = async (): Promise<Array<Chat>> => {
    const orderedChatsCollectionRef = query(chatsCollectionRef, orderBy("createdAt", "asc"))
    const snapshot = await getDocs(orderedChatsCollectionRef)
    return snapshot.docs.map((doc) => doc.data() as Chat)
  }

  return { chatsCollectionRef, createChat, fetchChat }
}
