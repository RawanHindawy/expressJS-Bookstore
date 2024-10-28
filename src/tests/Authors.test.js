import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import { generateAccessToken } from '../helpers/jwt.js';
import { StatusCodes } from 'http-status-codes';

describe('Authors API tests', () => {
  it('should list authors normally', async () => {
    const response = await request(app).get('/api/authors');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');

    response.body.forEach(author => {
      expect(author).to.have.property('id');
      expect(author).to.have.property('name'); 
      expect(author).to.have.property('bio');
    });
  });

  it('should create a new author', async () => {
    const newAuthor = {
      name: 'Test Author',
      bio: 'Test Author Bio'
    };

    const response = await request(app)
      .post('/api/authors')
      .send(newAuthor);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.name).to.equal(newAuthor.name);
    expect(response.body.bio).to.equal(newAuthor.bio);
  });

  it('should get a specific author', async () => {
    const response = await request(app).get('/api/authors/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name');
    expect(response.body).to.have.property('bio');
  });

  it('should update an author', async () => {
    const updatedAuthor = {
      name: 'Updated Author Name',
      bio: 'Updated Author Bio'
    };

    const response = await request(app)
      .put('/api/authors/9')
      .send(updatedAuthor);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
    expect(response.body.name).to.equal(updatedAuthor.name);
    expect(response.body.bio).to.equal(updatedAuthor.bio);
  });

  it('should delete an author', async () => {
    const authToken = generateAccessToken({ id: 1, email: 'test@example.com' });
    
    const response = await request(app)
      .delete('/api/authors/12')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).to.be.oneOf([StatusCodes.NO_CONTENT, StatusCodes.NOT_FOUND]);
  });
});
