import { TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { MapService } from './services/map.service';
import { of } from 'rxjs';

class MockMapService {
  search() { return of([]); }
}

describe('MapComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MapService, useClass: MockMapService }],
      imports: [MapComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MapComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should call search on input handlers', () => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
  const svc = TestBed.inject(MapService) as unknown as MockMapService;
  const spy = jest.spyOn(svc, 'search');
    const comp = fixture.componentInstance;
    comp.fromQuery = 'a';
    comp.searchFrom();
    expect(spy).toHaveBeenCalled();
  });
});
