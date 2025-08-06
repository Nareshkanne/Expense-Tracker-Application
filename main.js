var express=require('express');     //package variable
var mysql=require('mysql')
var app=express();                  //app variable to run
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>
{
res.sendFile(__dirname+"/home.html");
}
);
app.get('/reg',(req,res)=>
{
res.sendFile(__dirname+"/register.html");
}
);
app.get('/log',(req,res)=>
{
res.sendFile(__dirname+"/login.html");
}
);
app.get('/out',(req,res)=>
{
res.sendFile(__dirname+"/logout.html");
}
);
app.get('/ex',(req,res)=>
{
res.sendFile(__dirname+"/expenses.html");
}
);
app.get('/rev',(req,res)=>
{
res.sendFile(__dirname+"/revenue.html");
}
);
app.get('/ov',(req,res)=>
{
res.sendFile(__dirname+"/overview.html");
}
);
app.get('/pro',(req,res)=>
{
res.sendFile(__dirname+"/profile.html");
}
);

app.post('/reg', (req, res) => {
    console.log("Received Data:", req.body); // ✅ Log request body to debug

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;

    if (!email || !username || !password || !confirmpassword) {
        console.log("Error: Missing values in request body!");
        return res.send("Error: Missing values in request body!");
    }

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb66"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Database connected successfully!");

        con.query(
            "INSERT INTO user (email, username, password, confirmpassword) VALUES (?, ?, ?, ?)",
            [email, username, password, confirmpassword],
            function (err, result) {
                if (err) throw err;
                console.log("User inserted successfully!");
                res.sendFile(__dirname + "/login.html");  // Redirect to login page after successful registration
 
});
});
});
app.post('/log',(req,res)=>
{
var email = req.body.email;
var password=req.body.password;
var con=mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"mydb66"
});
con.connect(function(err)
{
if (err) throw err;

con.query("select * from user where email=? and password=?",[email,password],function(err,result)
{
if (err) throw err;
if(result.length>0)
console.log("User inserted successfully!");
res.sendFile(__dirname+"/expenses.html");


});
});
});


// POST - Add Expense
app.post('/add-expense', (req, res) => {
    const { title, date, amount } = req.body;

    if (!title || !date || !amount) {
        return res.json({ success: false, message: "Missing fields" });
    }

    const sql = "INSERT INTO expenses (title, date, amount) VALUES (?, ?, ?)";
    db.query(sql, [title, date, amount], (err, result) => {
        if (err) {
            console.error("Error adding expense:", err);
            return res.json({ success: false, message: err.message });
        }

        console.log("Expense added:", result);
        return res.send("done");
    });
});

// PUT - Update Expense
app.put('/update-expense/:id', (req, res) => {
    const expenseId = req.params.id;
    const { title, date, amount } = req.body;

    if (!title || !date || !amount) {
        return res.json({ success: false, message: "Missing fields" });
    }

    const sql = "UPDATE expenses SET title = ?, date = ?, amount = ? WHERE id = ?";
    db.query(sql, [title, date, amount, expenseId], (err, result) => {
        if (err) {
            console.error("Error updating expense:", err);
            return res.json({ success: false, message: err.message });
        }

        console.log("Expense updated:", result);
        return res.json({ success: true });
    });
});

// DELETE - Delete Expense
app.delete('/delete-expense/:id', (req, res) => {
    const expenseId = req.params.id;

    const sql = "DELETE FROM expenses WHERE id = ?";
    db.query(sql, [expenseId], (err, result) => {
        if (err) {
            console.error("Error deleting expense:", err);
            return res.json({ success: false, message: err.message });
        }

        console.log("Expense deleted:", result);
        return res.json({ success: true });
    });
});
app.listen(1234);
