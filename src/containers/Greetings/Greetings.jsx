import React, { useState, useEffect } from 'react';



const useEventLogger = () => {
  const [eventLog, setEventLog] = useState([]);

  useEffect(() => {
    const handleEvent = (event) => {
      const eventEntry = {
        type: event.type,
        target: event.target.tagName,
        timestamp: new Date().toISOString(),
      };
      setEventLog((prevLog) => [...prevLog, eventEntry]);
    };

    document.addEventListener('click', handleEvent);
    document.addEventListener('keyup', handleEvent);
    
    return () => {
      document.removeEventListener('click', handleEvent);
      document.removeEventListener('keyup', handleEvent);
    };
  }, []);

  return eventLog;
};

const GreetingComponent = () => {
  const eventLog = useEventLogger();

  return (
    <div>
      <h1>Event Logger</h1>
      <ul>
        {eventLog.map((event, index) => (
          <li key={index}>
            {`${event.type} event on ${event.target} at ${event.timestamp}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GreetingComponent;