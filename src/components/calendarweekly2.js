import { NavLink, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import '../cssfolder/calendar.css' 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';



document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      dateClick: this.handleDateClick,
      plugins: [ timeGridPlugin, interactionPlugin ],
      selectable: true,
      slotDuration: '00:30:00'
      //customButtons: {
        // addEventButton: {
        //   text: 'add event...',
        //   click: function() {
        //     var dateStr = prompt('Enter a date in YYYY-MM-DD format');
        //     var date = new Date(dateStr + 'T00:00:00'); // will be in local time
  
        //     if (!isNaN(date.valueOf())) { // valid?
        //       calendar.addEvent({
        //         title: 'dynamic event',
        //         start: date,
        //         allDay: true
        //       });
        //       alert('Great. Now, update your database...');
        //     } else {
        //       alert('Invalid date.');
        //     }
        //   }
        

      //}
    });
  
    calendar.render();
  });


