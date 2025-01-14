import { config } from "dotenv";


config();


if (!process.env.DATABASE_URL && process.env.NODE_ENV !== 'test') {
  console.error("No DATABASE_URL provided");
  process.exit(1);
}

if (!process.env.DATABASE_URL_TEST && process.env.NODE_ENV === 'test') {
  console.error("No DATABASE_URL_TEST provided");
  process.exit(1);
}


const dbConfig = process.env.NODE_ENV === 'test'
  ? {
      DATABASE_URL: process.env.DATABASE_URL_TEST,
    }
  : {
      DATABASE_URL: process.env.DATABASE_URL,
    };


export default dbConfig;





