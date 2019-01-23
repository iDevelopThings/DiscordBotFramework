let interval = null;
let time     = 25;
let message  = "Time left...";

interval = setInterval(() => {

    message = `${message} ${time}`;

    console.log(message);

    if (time === 0) {
        console.log('timer ended');
        clearInterval(interval);
    }

    time -= 5;

}, 5000);