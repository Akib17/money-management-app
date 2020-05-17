const mongoose = require('mongoose')

// Connect with MongoDB Atlas
const password = encodeURIComponent('dbUser')
const uri = `mongodb+srv://dbUser:${password}@cluster0-y21pa.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
const conn = mongoose.connection
// Test the connect with database
conn.on('error', err => {
   console.log(err)
})
 
conn.once('open', () => {
   console.log('Connection successful')
})
