import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import { generateAccessToken } from '../helpers/jwt.js';
import { StatusCodes } from 'http-status-codes';

describe('Books API tests', () => {
  it('should list books normally', async () => {
    const response = await request(app).get('/api/books');

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property('pagination');
    expect(response.body).to.have.property('data');

    expect(response.body.data).to.be.an('array');

    response.body.data.forEach(book => {
      expect(book).to.have.property('id');
      expect(book).to.have.property('title');
      expect(book).to.have.property('author');
      expect(book).to.have.property('description');
    });
  });

  it('should create a new book', async () => {

    const newBook = {
      title: 'Test Book',
      authorId: 1,
      description: 'Test Description',
      publicationYear: 2000,
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.title).to.equal(newBook.title);
    expect(response.body.authorId).to.equal(1);
    expect(response.body.description).to.equal(newBook.description);
  });
});
it('should edit an existing book', async () => {
  const updatedBook = {
    title: 'Updated Book Title',
    description: 'Updated Description',
    publicationYear: 2020,
    authorId: 1
  };

  const response = await request(app)
    .put('/api/books/2')
    .send(updatedBook);

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property('id');
  expect(response.body.title).to.equal(updatedBook.title);
  expect(response.body.description).to.equal(updatedBook.description);
  expect(response.body.publicationYear).to.equal(updatedBook.publicationYear);
  expect(response.body.authorId).to.equal(updatedBook.authorId);
});

it('should delete a book', async () => {
  const authToken = generateAccessToken({ id: 1, email: 'test@example.com' });
  const response = await request(app)
    .delete('/api/books/13')
    .set('Authorization', `Bearer ${authToken}`);
  expect(response.status).to.be.oneOf([StatusCodes.NO_CONTENT, StatusCodes.NOT_FOUND]);
});

