MinoDB Calendar example
======

Example integrating [MinoDB](https://github.com/MarcusLongmuir/MinoDB/) and [FullCalendar](https://github.com/arshaw/fullcalendar).

##Features
* Calendar widget on the main page (powered by [FullCalendar](https://github.com/arshaw/fullcalendar))
* Form creating new event (powered by [MinoVal](https://github.com/MarcusLongmuir/MinoVal))
* Admin interface (MinoDB browser)

##Important files
* [server.js](server.js) - backend code with all endpoints (**34 lines in total**)
* [index.html](public/index.html) - frontend code with calendar widget and new event form (**98 lines in total**)
* [initial_data.js](initial_data.js) - creates initial data such as types, MinoVal rule and first event.
* [mino_setup.js](mino_setup.js) - sets up Mino with all its dependencies

##Live example
http://mino-calendar-example.herokuapp.com

http://mino-calendar-example.herokuapp.com/mino/

Login details:
* username: my_app
* password: my_password


##Heroku 
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/bestan/mino-calendar-example)
