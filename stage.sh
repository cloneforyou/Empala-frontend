echo ' EMPALA FRONTEND APP'
echo ' Terminating FOREVER and NODE ...'
forever stopall && killall node
echo ' Building static files ...'
npm run build
echo ' Building complete'
echo ' Starting the app with forever ...'
forever start -c 'npm run stage' ./
echo ' Ready'
