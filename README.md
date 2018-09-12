## Documentation:
  - The app will be build using Model-View-Controller architectural pattern.
  - Backbone is used for models,collection manipulation, connect to API over RESTful json interface
  - Backbone.Marionette is used to organize the app in small views and for handling events.

##  Dependencies:
  - Framework environment
    + Backbone: http://backbonejs.org/
    + Backbone.Marionettejs: https://marionettejs.com/docs/v2.4.7 (UI) (you can update this to the last version if you want)
    + Jquery
  - Template
    + Handlebars: http://handlebarsjs.com/reference.html (recommended for building templating you can also use underscore)

  Use the following node module dependencies with npm:
  - run `npm install` to install the dependencies ( express, backbone, marionette, jquery)
  - install json-server, nodemon globaly.
    + `npm install json-server -g` (data-base server that stores in db.json the data and returns them based on xhr calls)
    + `npm install nodemon -g` (server)
  - run the following commands in the folder project on different terminal tabs
    + `nodemon server/server.js` to start server on port 8000 (http://localhost:8000)
    + `json-server --watch db.json` to start json server used for api calls (https://github.com/typicode/json-server)
