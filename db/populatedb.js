const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  email VARCHAR ( 255 ) UNIQUE,
  password VARCHAR ( 255 ),
  contacts contacts[],
  groups groups[],
  wallpaper_url VARCHAR ( 255 ), 
  profile_pic_url VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    email VARCHAR ( 255 ) UNIQUE,
    profile_pic_url VARCHAR ( 255 ),
    is_online BOOLEAN,
    unread INTEGER,
    messages messages[]
);

CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    admin_email VARCHAR ( 255 ),
    profile_pic_url VARCHAR ( 255 ),
    is_online BOOLEAN,
    unread INTEGER,
    members users[],
    messages messages[],
    created DATE DEFAULT CURRENT_DATE
);
  
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    sender_email VARCHAR ( 255 ),
    date DATE DEFAULT CURRENT_DATE,
    profile_pic_url VARCHAR ( 255 ),
    message VARCHAR ( 255 ),
    time TIMESTAMP DEFAULT NOW(),
    unread BOOLEAN
);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({ connectionString: "postgresql://postgres:postgres@localhost:5432/mxit" });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();