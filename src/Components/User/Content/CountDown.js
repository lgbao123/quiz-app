import React, { useEffect, useState } from 'react'

function CountDown(props) {
   const toHHMMSS = (second) => {
      const date = new Date(0);
      date.setSeconds(second); // specify value for SECONDS here
      const timeString = date.toISOString().substring(11, 19);
      return timeString
   }
   const [count, setCount] = useState(10)
   useEffect(() => {
      if (count === 0) {
         props.handleTimeUp();
         return
      }
      const timer = setInterval(() => {
         setCount(count - 1)
      }, 1000);
      return () => {
         clearInterval(timer)
      }
   }, [count])
   return (
      <>
         {toHHMMSS(count)}
      </>
   )
}

export default CountDown