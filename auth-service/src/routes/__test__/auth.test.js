const request = require('supertest');
const app = require('../../app'); // 我们需要分离 app 的创建和启动

describe('Auth Routes', () => {
  it('returns 201 on successful signup', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  });

  it('returns 400 with invalid email', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        email: 'invalid',
        password: 'password'
      })
      .expect(400);
  });
}); 