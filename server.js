const express = require("express")

const app = express()

const PORT = 80

app.use(express.static('frontend/dist'))

app.listen(PORT, () => console.log(`Server has been started PORT: ${PORT}`))