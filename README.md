# expressServerBase

This repo contains a functional template for a web server based on Node.js and Express.

## How to run

To run this server on your own computer, you'll first need to install Node.js and NPM.

Once you have those two command line tools available, enter a command prompt and run the following command to install the required dependencies via NPM.

```
  npm install
```

Once all dependencies are installed, to run the preprocessing Gulp script, install the Gulp command line tool (unless it's already installed on your terminal) and run the script:

```
  npm install --global gulp
  gulp
```

Note if you aren't familiar with Gulp or prefer not to use it, all you need to do is use the public/ folder to store static assets directly, rather than the assets/ folder. In that case, you won't be able to use SASS, LESS, Typescript and other transpiled languages, unless you do the transpiling yourself. IMPORTANT: if you store any assets directly into the public/ folder, do not run the Gulp script as it is provided. This script will OVERWRITE everything in that folder, thus erasing your files.

Finally, after doing the preprocessing, start the server by running the following command:

```
  npm start
```

Once the server is started, you can access it from the same machine by opening a web browser and opening the HTTP address localhost:3000 (with an unmodified copy of the project).

## Browser compatibility

The included web sites (HTML, CSS and client-side JS scripts) have been tested on a Mozilla Firefox browser, and may not be displayed correctly on other browsers. The Node.js backend will of course not cause browser compatibility problems of any kind. Since the idea of this project is to serve as a template and be modified to suit the users' needs, you are encouraged to make any modifications necessary to ensure backward compatibility of any derived work.

## Included functions

- Serving static files unmodified (ex. static HTML files)
- Preprocessing of static assets (SASS to CSS, minifying JS).
- Adding custom middleware to add additional logic to some or all requests (example: a counter that counts front page hits)
- AJAX calls / API hooks (for GET, POST and all other methods supported by HTTP), returning any kind of data (example: return the front page hits as a JSON object)

## Not included (but possible) functions

- Transpiling Typescript to Javascript. This can easily be added to the Gulp script used (gulpfile.js)
- Conversion of graphics to the more optimal WebP format. Beware browser compatibility issues if you do, though.

## License

This work is provided under the MIT license, whose terms are as specified in the included LICENSE file.
