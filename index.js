const express = require('express');
const cors = require('cors');
const Router = require('./Router/watchlistRoute');
const port = 4000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/watchlist",Router);

app.listen(port,()=>{
    console.log(`port is running on ${port}`);
})
