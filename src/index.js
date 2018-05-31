const express = require('express')
const http = require('http')
const fs = require('fs')

const app = express()
const server = http.Server(app);

let extensions = [];
// const baseUrl = 'https://extensions-app-backend.herokuapp.com'
const baseUrl = 'http://localhost:9000'

fs.readdir('./public/', (err, files) => {
	files.forEach(file => {
		let info = require(`../public/${file}`)
		extensions.push({
			name: info.name,
			url: `${baseUrl}/extensions/${file}`,
			description: info.description,
			version: info.version,
			icon: info.icon
		})
	})
})

app
	.use(express.json())
	.get('/', (req, res) => {
		res.send('Hello world')
	})
	.get('/extensions', (req, res) => {
		res.json(extensions)
	})
	.use('/extensions', express.static('public'))

server.listen(9000, () => console.log('App listening on port 9000!'))
