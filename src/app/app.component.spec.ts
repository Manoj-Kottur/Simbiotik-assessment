import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a router-outlet in the template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    // router-outlet is an element selector; the compiled template will project it
    expect(el.querySelector('router-outlet')).not.toBeNull();
  });
});