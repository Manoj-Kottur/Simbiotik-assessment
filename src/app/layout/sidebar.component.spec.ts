import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

class MockAuthService {
  logout = jest.fn();
}

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should logout and navigate when logout() called', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const comp = fixture.componentInstance;
    const auth = TestBed.inject(AuthService) as unknown as MockAuthService;
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    comp.logout();
    expect(auth.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
