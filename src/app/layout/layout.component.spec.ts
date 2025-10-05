import { TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, RouterTestingModule]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
  
  it('should render sidebar and router-outlet', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-sidebar')).not.toBeNull();
    expect(el.querySelector('router-outlet')).not.toBeNull();
  });
});
