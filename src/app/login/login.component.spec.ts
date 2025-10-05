import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../core/services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

class MockAuthService {
  login() { return of({ accessToken: 'x' }); }
}

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should call authService.login on submit and navigate on success', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const comp = fixture.componentInstance;
      const auth = TestBed.inject(AuthService) as unknown as MockAuthService;
      const spy = jest.spyOn(auth, 'login').mockReturnValue(of({ accessToken: 'x' }));
      const router = TestBed.inject(Router);
      jest.spyOn(router, 'navigate');
    comp.username = 'u';
    comp.password = 'p';
    comp.onSubmit();
    expect(spy).toHaveBeenCalled();
  });
});
