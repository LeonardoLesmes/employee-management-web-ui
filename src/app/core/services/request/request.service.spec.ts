import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestService } from './request.service';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequestService]
    });
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of requests', (done: DoneFn) => {
    service.getRequests().subscribe(requests => {
      expect(requests.length).toBeGreaterThan(0);
      expect(requests[0].id).toBeDefined();
      done();
    });
  });

  it('should cancel a request', (done: DoneFn) => {
    service.getRequests().subscribe(requests => {
      const requestId = requests[0].id;
      service.cancelRequest(requestId).subscribe(result => {
        expect(result).toBeTrue();
        service.getRequests().subscribe(updatedRequests => {
          const updatedRequest = updatedRequests.find(req => req.id === requestId);
          expect(updatedRequest?.status).toBe('rechazada');
          done();
        });
      });
    });
  });
});
