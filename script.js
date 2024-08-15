const holidaysIn2025 = [
            "Martin Luther King Jr. Day",
            "President's Day",
            "Good Friday",
            "Memorial Day",
            "Juneteenth",
            "Independence Day"
        ];

        document.getElementById('add-event').addEventListener('click', function() {
            const eventName = document.getElementById('event-name').value.trim();
            const eventDate = document.getElementById('event-date').value;

            if (eventName === '' || eventDate === '') {
                alert('Please enter both the event name and date.');
                return;
            }

            const eventYear = new Date(eventDate).getFullYear();

            if (isNaN(eventYear) || eventYear.toString().length !== 4) {
                alert('Please enter a valid date with a 4-digit year.');
                return;
            }

            const event = {
                name: eventName,
                date: new Date(eventDate)
            };

            displayEvent(event);
            addEventToCalendar(event);
        });

        function displayEvent(event) {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            const eventName = `<strong>${event.name}</strong>: `;
            eventItem.innerHTML = `${eventName}<span class="countdown">Calculating...</span> <button class="delete-event">Delete</button>`;

            function updateCountdown() {
                const now = new Date();
                const timeRemaining = event.date - now;

                if (timeRemaining < 0) {
                    clearInterval(countdownInterval); // Stop the interval if the event is in the past
                    eventItem.querySelector('.countdown').innerText = 'Event has passed';
                    return;
                }

                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                eventItem.querySelector('.countdown').innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }

            // Update countdown every second
            const countdownInterval = setInterval(updateCountdown, 1000);

            // Initial call to set the countdown immediately
            updateCountdown();

            // Delete event functionality
            eventItem.querySelector('.delete-event').addEventListener('click', function() {
                clearInterval(countdownInterval); // Clear the interval when the event is deleted
                eventItem.remove();
                removeEventFromCalendar(event);
            });

            document.getElementById('event-list').appendChild(eventItem);
        }

        function addEventToCalendar(event) {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'calendar-event';
            eventDiv.innerHTML = `<strong>${event.name}</strong><br>${event.date.toDateString()}`;
            eventDiv.dataset.date = event.date.toDateString(); // For deletion reference
            document.getElementById('calendar-container').appendChild(eventDiv);
        }

        function removeEventFromCalendar(event) {
            const calendarEvents = document.querySelectorAll('.calendar-event');
            calendarEvents.forEach(calendarEvent => {
                if (calendarEvent.dataset.date === event.date.toDateString()) {
                    calendarEvent.remove();
                }
            });
        }

        // Handle holiday click events
        document.getElementById('holiday-list').addEventListener('click', function(event) {
            if (event.target.tagName === 'LI') {
                const holidayName = event.target.getAttribute('data-name');
                const holidayDate = new Date(event.target.getAttribute('data-date'));

                // Set the year to 2025 for specific holidays and explicitly handle New Year's Day
                if (holidayName === "New Year's Day") {
                    holidayDate.setFullYear(2025);
                    holidayDate.setMonth(0); // January
                    holidayDate.setDate(1);  // 1st
                } else if (holidaysIn2025.includes(holidayName)) {
                    holidayDate.setFullYear(2025);
                } else {
                    // Set the year to 2024 for other holidays
                    holidayDate.setFullYear(2024);
                }

                // Adjust the date to be +1 day for calendar display, except for New Year's Day
                if (holidayName !== "New Year's Day") {
                    holidayDate.setDate(holidayDate.getDate() + 1);
                }

                const eventObj = {
                    name: holidayName,
                    date: holidayDate
                };

                displayEvent(eventObj);
                addEventToCalendar(eventObj);
            }
        });

        // Scroll to Top Button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.id = 'scroll-to-top';
scrollToTopButton.innerText = 'Top';
scrollToTopButton.style.display = 'none'; // Hidden by default
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
        });