import { memo } from "react"

import { css } from "linaria"

import { Footer } from "~/components/elements/Footer"

type Props = {
  children: React.ReactNode | Array<React.ReactNode>
}

export const MainLayout: React.FC<Props> = memo(({ children }) => {
  return (
    <div className={classes["container"]}>
      <header className={classes["header"]}>
        <p className={classes["header-title"]}>先輩講座 掲示板</p>
      </header>
      <main className={classes["content"]}>{children}</main>
      <Footer />
    </div>
  )
})

const classes = {
  container: css`
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
  `,
  header: css`
    position: sticky;
    top: 0;
    display: grid;
    align-items: center;
    height: 44px;
    background-color: var(--primary-color);
    padding: 12px;
  `,
  "header-title": css`
    font-size: 20px;
    font-weight: bold;
    color: white;
  `,
  content: css`
    padding: 12px;
    overflow-y: scroll;
  `,
}
