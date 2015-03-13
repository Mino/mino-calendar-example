MinoDB Calendar example
======

Example integrating [MinoDB](https://github.com/MarcusLongmuir/MinoDB/), [MinoVal](https://github.com/MarcusLongmuir/MinoVal/) and [FullCalendar](https://github.com/arshaw/fullcalendar).

##Features
* Calendar widget on the main page (powered by [FullCalendar](https://github.com/arshaw/fullcalendar))
* Form creating new event (powered by [MinoVal](https://github.com/MarcusLongmuir/MinoVal))
* Admin interface (MinoDB browser)

##Live example
http://mino-calendar-example.herokuapp.com

Login details:
* username: my_app
* password: my_password

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/bestan/mino-calendar-example)

##Installation
```
npm install
node server.js
```
You also need [MongoDB](http://www.mongodb.org/) running on ```mongodb://127.0.0.1:27017/mino-example``` (URL can be changed in [mino_setup.js](mino_setup.js)).

##Things to try
* Create an event using the form on the [homepage](http://mino-calendar-example.herokuapp.com/).
* Log in to the [Browser](http://mino-calendar-example.herokuapp.com/mino/browser/) using credentials above.
* Navigate to ```events``` folder, edit or delete one of the items and verify that changes were updated on the home page.
* Navigate to ```event``` in [Types](http://mino-calendar-example.herokuapp.com/mino/browser/event). Click Edit and add an additional field to the Type (green button at the bottom). Save the Type and check the home page - the form will have new field immediately.

##Code to read
* [server.js](server.js) - backend code with all endpoints (**34 lines in total**)
* [index.html](public/index.html) - frontend code with calendar widget and new event form (**98 lines in total**)
* [initial_data.js](initial_data.js) - creates initial data such as types, MinoVal rule and first event. All of it can be created using Browser and MinoVal UI.
* [mino_setup.js](mino_setup.js) - sets up Mino with all its dependencies (**31 lines in total**)
