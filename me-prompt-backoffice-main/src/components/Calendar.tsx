import React, { useState } from 'react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInPrevMonth = daysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`prev-${i}`} className="disabled">{daysInPrevMonth - firstDayOfMonth + i + 1}</div>);
    }

    for (let i = 1; i <= daysInMonth(currentDate.getFullYear(), currentDate.getMonth()); i++) {
      days.push(<div key={`day-${i}`}>{i}</div>);
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(<div key={`next-${i}`} className="disabled">{i}</div>);
    }

    return days;
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + delta, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="calendar-container">
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar">
        <div className="month">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>
        <div className="days">
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
