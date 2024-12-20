const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "1234", // Enter your password here
    database: "testWad", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});


const execute = async(query1, query2, query3) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query1); // sends queries
        await pool.query(query2); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "courses" (
	    "id" SERIAL PRIMARY KEY,         
	    "coursename" VARCHAR(200) NOT NULL,
        "coursecode" VARCHAR(200) NOT NULL,
        "max" integer NOT NULL,
        "registered" integer NOT NULL,
        "available" integer NOT NULL,
        "groupsnumbers" integer NOT NULL,
        "description" VARCHAR(200)
    );`;


const insertDataQuery = `WITH data (coursename, coursecode, max,  registered, available, groupsnumbers, description) AS 
    (
    VALUES
        ('Web Application Development',   'LTAT.05.004', 210, 180, 30, 7, 'Web Application Development ...'),
        ('Enterprise System Integration', 'MTAT.03.229', 60,   34, 26, 2,  'Enterprise System Integration ...'),
        ('Requirements Engineering',      'MTAT.03.306', 120, 112,  8, 4, 'Requirements Engineering ...'),
        ('Systems Modelling',             'MTAT.03.083', 60,   54,  6, 2, 'Systems Modelling ...')
    )
    
    INSERT INTO courses(coursename, coursecode, max,  registered, available, groupsnumbers, description) 
    SELECT   d.coursename, d.coursecode, d.max,  d.registered, d.available, d.groupsnumbers, d.description
    FROM data d
    WHERE NOT EXISTS (SELECT * FROM courses WHERE id = 1);`

execute(createTblQuery1, insertDataQuery).then(result => {
    if (result) {
        console.log('If does not exists, table "courses" is created');
    }
});

module.exports = pool;