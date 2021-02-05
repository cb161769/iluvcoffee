import { Test, TestingModule } from '@nestjs/testing';
import { CofeesServiceService } from './cofees-service.service';

describe('CofeesServiceService', () => {
  let service: CofeesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CofeesServiceService],
    }).compile();

    service = module.get<CofeesServiceService>(CofeesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
