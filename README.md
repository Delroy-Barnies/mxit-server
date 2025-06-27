# Mxit Server Api 

Welcome! This is the backend API for my Mxit-inspired messaging application.
Built with Node.js and Express, this API handles user authentication, contact management, group creation, and real-time messaging. 
All data is stored in a PostgreSQL database accessed via Prisma ORM.

***Node.js (v24 or higher)***
***Express.js (v4.21.2 or higher)***
***ECMAScript 2024 (ES15)***

## Tech Stack

- Node.js (v24 or higher) – Runtime environment
- Express.js (v4.21.2 or higher) – Web framework
- Prisma ORM – Type-safe database access
- PostgreSQL – Relational database
- JavaScript – Backend language
- ECMAScript 2024 (ES15) – Language version standard

## Installation

Clone the repository:
git clone https://github.com/yourusername/mxit-server-api.git
cd mxit-server-api

Install dependencies:
npm install

Setup environment variables:
Create a .env file based on .env.example

Add your PostgreSQL credentials and other config values

Run database migrations:
npx prisma migrate dev

Start the server:
npm run dev


## Contributors

- Delroy Barnies <Delroybarnies99@gmail.com>

## License and copyright

© Delroy Barnies, All rights reserved
