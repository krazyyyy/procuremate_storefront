import React from "react"
import Nav from "@modules/customizer/templates/nav"
import Sidebar from "@modules/customizer/sidebar"
import clsx from "clsx"
import styles from './customizer.module.css'

const CustomizerLayout: React.FC = ({ children }) => {
  const steps = [
    {
      selector: '#canvas',
      content: 'This is canvas to edit your design, press Shift Key to pan',
    },
    {
      selector: '#sidebar1',
      content: 'Here you can add layers to edit. ',
    },
    {
      selector: '#sidebar2',
      content: 'Here you can add layers to edit. ',
    },
    {
      selector: '#text',
      content: 'Edit your text from here ',
    },
  // ...
  ];

  return (
    <div className="">
      <div className="z-[-1] bg-white fixed top-0">
        <span className={styles.azonix}>h</span>
        <span className={styles.basicSquare}>h</span>
        <span className={styles.basicSquareSolid} >h</span>
        <span className={styles.diamante}>h</span>
        <span className={styles.basketball}>h</span>
        <span className={styles.consolas}>h</span>
        <span className={styles.bignoodle}>h</span>
        <span className={styles.bombard}>h</span>
        <span className={styles.dalek}>h</span>
        <span className={styles.impact}>h</span>
        <span className={styles.impacted}>h</span>
        <span className={styles.impactUnicode}>h</span>
        <span className={styles.hawainas}>h</span>
      </div>
      <Nav />
      <div className="bg-gray-50 h-[calc(100vh-85px)] small:h-[calc(100vh-115px)] flex flex-col-reverse small:flex-row">
        <Sidebar />
        <main className={clsx(
          "absolute  small:relative h-full w-full",
        )}>{children}</main>
      </div>
    </div >
  )
}

export default CustomizerLayout
