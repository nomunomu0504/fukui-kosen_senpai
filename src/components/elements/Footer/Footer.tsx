import { memo, useCallback, useState } from "react"

import { css } from "linaria"

import { useFirestore } from "~/hooks/useFirestore"

type Props = {}

export const Footer: React.FC<Props> = memo((): JSX.Element => {
  const { createChat } = useFirestore()
  const [message, setMessage] = useState<string>("")

  const handleClickSendButton = useCallback(() => {
    console.log(message)
    createChat({
      message,
    })
    setMessage("")
  }, [createChat, message])

  return (
    <footer className={classes["container"]}>
      <textarea
        rows={3}
        className={classes["message-input"]}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力"
      />
      <button className={classes["submit-button"]} onClick={handleClickSendButton}>
        送信
      </button>
    </footer>
  )
})

const classes = {
  container: css`
    display: grid;
    align-items: end;
    grid-template-columns: 1fr auto;
    column-gap: 16px;
    min-height: 40px;
    background-color: var(--primary-color);
    border-radius: 16px 16px 0 0;
    padding: 16px;
  `,
  "message-input": css`
    height: auto;
    padding: 8px;
    border-radius: 8px;
    border: none;
    resize: none;
  `,
  "submit-button": css`
    border-radius: 8px;
    border: none;
    padding: 8px 16px;
    background-color: yellow;
  `,
}
