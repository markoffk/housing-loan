import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { WebAppModule } from '../src/web-app.module';
import { INestApplication } from '@nestjs/common';

describe('RootController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [WebAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('This is root API endpoint which has no any function.');
  });
});
