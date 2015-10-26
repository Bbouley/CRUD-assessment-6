var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/books_crud';

module.exports = connectionString;