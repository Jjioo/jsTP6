npm init
npm install ejs --save
npm install express body-parser
 
node index.js



http://localhost:3000/convert/celsius-to-fahrenheit?celsius=77
http://localhost:3000/temperatures
http://localhost:3000/temperatures/api/11PM
http://localhost:3000/temperatures/api/12AM?metric=F



+] Request with from and to Parameters:
http://localhost:3000/temperatures/api2?from=1&to=4



+] Request with avg Parameter:
http://localhost:3000/temperatures/api2?from=1&to=4&avg=true



+] Request with metric Parameter for Fahrenheit:
http://localhost:3000/temperatures/api2?from=1&to=4&metric=F



*] Combined Parameters:
http://localhost:3000/temperatures/api2?from=1&to=4&avg=true&metric=F
