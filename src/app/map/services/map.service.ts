import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

@Injectable()
export class MapService {

  constructor(private http: HttpClient) { }

  geocode(query: string): Observable<any[]> {
    const url = `/nominatim/search?format=json&q=${encodeURIComponent(query)}`;
    return this.http.get<any[]>(url).pipe(
      catchError(() => of([]))
    );
  }

  route(start: { lat: number, lng: number }, end: { lat: number, lng: number }): Observable<{ distance: number, duration: number, geometry: any }> {
    const url = `/osrm/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
    return this.http.get<any>(url).pipe(
      map(res => {
        if (!res.routes || !res.routes.length) throw new Error('No route found');
        const route = res.routes[0];
        return {
          distance: Math.round(route.distance),
          duration: Math.round(route.duration),
          geometry: route.geometry
        };
      }),
      catchError(err => throwError(() => err))
    );
  }
}
