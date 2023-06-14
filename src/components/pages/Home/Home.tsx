import { memo, useEffect, useState } from "react"


import { onSnapshot, orderBy, query } from "firebase/firestore"
import { css } from "linaria"
import Head from "next/head"

import { Chat } from "~/@types/chat"
import { useFirestore } from "~/hooks/useFirestore"
import { MainLayout } from "~/layouts/MainLayout"

type Props = {}

export const Home: React.FC<Props> = memo((): JSX.Element => {
  const { chatsCollectionRef } = useFirestore()
  const [chats, setChats] = useState<Array<Chat>>([])

  useEffect(() => {
    return onSnapshot(query(chatsCollectionRef, orderBy("createdAt", "asc")), (snapshot) => {
      console.log(snapshot.metadata)
      if (!snapshot.metadata.hasPendingWrites) {
        snapshot.docChanges().forEach((change) => {
          setChats((prev) => [change.doc.data() as Chat, ...prev])
        })
      }
    })
  }, [chatsCollectionRef])

  const timestampToDate = (date: Date) => {
    return `${date.getHours()}`.padStart(2, "0") + ":" + `${date.getMinutes()}`.padStart(2, "0")
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainLayout>
        <div className={classes["chat-container"]}>
          {chats.map((chat) => (
            <div key={chat.uid} className={classes["chat-item"]}>
              <p className={classes["text"]}>{chat.message}</p>
              <div className={classes["info"]}>
                <p className={classes["uid"]}>{chat.uid}</p>
                <p className={classes["time"]}>{timestampToDate(chat.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </MainLayout>
    </>
  )
})

const classes = {
  "chat-container": css``,
  "chat-item": css`
    padding: 12px;
    border-bottom: 1px solid #ccc;
  `,
  text: css`
    padding-bottom: 16px;
  `,
  info: css`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-items: end;
    column-gap: 16px;
  `,
  uid: css`
    font-size: 12px;
    color: gray;
  `,
  time: css`
    font-size: 14px;
  `,
}
