const express = require('express')
const fs = require('fs')
const app = express()

let extensions = [];
const baseUrl = 'https://extensions-app-backend.herokuapp.com'

fs.readdir('./public/', (err, files) => {
	files.forEach(file => {
		extensions.push({
			name: file.replace('.js', ''),
			url: `${baseUrl}/extensions/${file}`
		})
	})
})

app.get('/extensions', (req, res) => {
	res.json(extensions)
})

app.get('/', (req, res) => {
	res.send('Hello world')
})

app.use('/extensions', express.static('public'))

app.listen(9000, () => console.log('App listening on port 9000!'))
