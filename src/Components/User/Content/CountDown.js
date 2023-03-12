import React, { useEffect, useState } from 'react'

function CountDown(props) {
   const toHHMMSS = (second) => {
      const date = new Date(0);
      date.setSeconds(second); // specify value for SECONDS here
      const timeString = date.toISOString().substring(11, 19);
      return timeString
   }

   //time 

   const [count, setCount] = useState(60)
   useEffect(() => {
      setCount(+props.time * 60)
   }, [props.time])
   useEffect(() => {
      if (count === 0) {
         props.handleTimeUp();
         return
      }
      const timer = setInterval(() => {
         if (!props.isFinish) {

            setCount(count - 1)
         }
      }, 1000);
      return () => {
         clearInterval(timer)
      }
   }, [count, props.isFinish])
   return (
      <>
         {toHHMMSS(count)}
      </>
   )
}

export default CountDown