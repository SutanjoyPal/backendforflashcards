import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'flashcard'
})

app.get("/", (req, res) => {
    res.json("hello this is backend app");
})

app.post('/flashcards', (req, res) => {
    //const { question, answer } = req.body;
    const question = req.body.question;
    const answer = req.body.answer;
    const q = "INSERT INTO qa (`question`, `answer`) VALUES (?,?)";
    db.query(q, [question, answer], (err, result) => {
        if(err) return res.json(err);
        return res.json({message: "Data added successfully", id: result.insertId});
    })
})

// Get all flashcards
app.get('/flashcards', (req, res) => {
    const q = "SELECT * FROM qa";
    db.query(q, (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});

// Edit a flashcard
app.put('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const q = "UPDATE qa SET question = ?, answer = ? WHERE id = ?";
    db.query(q, [question, answer, id], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Flashcard updated successfully" });
    });
});

// Delete a flashcard
app.delete('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM qa WHERE id = ?";
    db.query(q, [id], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Flashcard deleted successfully" });
    });
});

// app.get("/qnas", (req, res) => {
//     const q = "SELECT * FROM qa";
//     db.query(q, (err, data) => {
//         if(err) return res.json(err);
//         return res.json(data);
//     })
// })


app.listen(8800,()=>{
    console.log("Server is running on port 8800");
})