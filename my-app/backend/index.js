const express = require('express')
const mongoDB = require('./db')
const cors=require("cors");
const app = express()
const port = 5000

const corsOptions ={
  origin:'*', 
  credentials:true,          
  optionSuccessStatus:200,
}

mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors(corsOptions)) 
app.use(express.json())
app.use('/api', require('./routes/createUser'))
app.use('/api', require('./routes/loginuser'))
app.use('/api', require('./routes/displayData'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})