const express = require('express');
const app = express();

let totalSlots = 50;
let availableSlots = 50;

app.use(express.json());

// Home Page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>SRM Smart Parking</title>
        <style>
          body {
            font-family: Arial;
            text-align: center;
            margin-top: 50px;
            background-color: #f4f4f4;
          }
          h1 { color: #333; }
          .box {
            background: white;
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
          }
          button {
            padding: 10px 20px;
            margin: 10px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .park { background-color: green; color: white; }
          .leave { background-color: red; color: white; }
        </style>
      </head>

      <body>
        <div class="box">
          <h1>🚗 SRM Smart Parking System</h1>
          <h2>Available Slots: ${availableSlots}</h2>

          <button class="park" onclick="park()">Park</button>
          <button class="leave" onclick="leave()">Leave</button>
        </div>

        <script>
          function park() {
            fetch('/park', { method: 'POST' })
              .then(() => location.reload());
          }

          function leave() {
            fetch('/leave', { method: 'POST' })
              .then(() => location.reload());
          }
        </script>
      </body>
    </html>
  `);
});

// Park
app.post('/park', (req, res) => {
  if (availableSlots > 0) {
    availableSlots--;
  }
  res.sendStatus(200);
});

// Leave
app.post('/leave', (req, res) => {
  if (availableSlots < totalSlots) {
    availableSlots++;
  }
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
