const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageHumidity = document.querySelector('#message-3');
const messageDay = document.querySelector('#message-4');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageHumidity.textContent = '';
    messageDay.textContent = '';

    fetch(`/weather?location=${location}`).then((response) => {
        if (!response.ok) {
            messageOne.innerHTML = 'Failed to get weather forecast information';
            return;
        }

        response.json().then((data) => {
            if (data.error) {
                messageOne.innerHTML = data.error;
                return;
            }

            messageOne.innerHTML = `${data.placeName}`;
            messageTwo.innerHTML = `${data.forecast.forecast}`;
            messageHumidity.innerHTML = `Humidity is ${data.forecast.humidity}`;
            messageDay.innerHTML = `Is day : ${data.forecast.isDay}`;
        });
    });
});
