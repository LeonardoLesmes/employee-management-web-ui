import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService],
        });
        service = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get roles', (done: DoneFn) => {
        service.getRoles().subscribe(roles => {
            expect(roles.length).toBeGreaterThan(0);
            expect(roles[0].id).toBeDefined();
            expect(roles[0].type).toBeDefined();
            expect(roles[0].description).toBeDefined();
            done();
        });
    });
});
