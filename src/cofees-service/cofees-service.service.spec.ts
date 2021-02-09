import { FlavorEntity } from './../entitys/flavor.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CofeesServiceService } from './cofees-service.service';
import { Coffee } from '../../src/entitys/coffee';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CofeesServiceService', () => {
  let service: CofeesServiceService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CofeesServiceService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(FlavorEntity), useValue: createMockRepository() }, // 👈
        { provide: getRepositoryToken(Coffee), useValue: createMockRepository() }],
    }).compile();

    service = module.get<CofeesServiceService>(CofeesServiceService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = 1;
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
      describe('otherwise', () => {
        it('should throw the "NotFoundException"', async (done) => {
          const coffeeId = 1;
          coffeeRepository.findOne.mockReturnValue(undefined);
  
          try {
            await service.findOne(coffeeId);
            done();
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
          }
        });
    });
  })
});
});
