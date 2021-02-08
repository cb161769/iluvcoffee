import { CofeesServiceService } from 'src/cofees-service/cofees-service.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeRatingService {
    /**
     *
     */
    constructor(private readonly coffeService:CofeesServiceService) {
        
        
    }
}
