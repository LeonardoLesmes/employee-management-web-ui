import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestService } from './request.service';

describe('RequestService', () => {
    let service: RequestService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RequestService],
        });
        service = TestBed.inject(RequestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
