import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from './root.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [RootController],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const rootController = app.get<RootController>(RootController);
      expect(rootController.get()).toBe(
        'This is root API endpoint which has no any function.',
      );
    });
  });
});
