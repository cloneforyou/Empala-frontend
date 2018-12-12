## Empala Platform frontend

This is the client application for the Empala Platform.

Stack: `NextJS / React / Redux` with `Saga` for async stuff.

`DEV`: http://localhost:3000

`STAGE`: https://dev.empala.com

`PROD`: https://platform.empala.com

Use `keys.js` for origin definition and some third party client IDs.

Launching:
-----------------------

`DEV`: set `origin` to `dev` in the `keys.js` file and run `npm run dev`

`STAGE`: set `origin` to `stage` in the `keys.js` file and run `npm run stage` or `bash stage.sh` to build the app and serve the static files (if deploying on AWS)

`PROD`: set `origin` to `prod` in the `keys.js` file and run `npm run stage` or `bash stage.sh` to build the app and serve the static files (if deploying on AWS)
