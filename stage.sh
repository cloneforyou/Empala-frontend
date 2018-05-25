echo ' EMPALA FRONTEND APP'
echo ' Building static files ...'
npm run build
echo ' Building complete'
echo ' Starting the app with forever ...'
forever start -c 'npm run stage' ./
echo ' Ready'