import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './services/map.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

(L.Icon.Default as any).mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MapComponent implements AfterViewInit {
  map!: L.Map;
  fromQuery = '';
  toQuery = '';
  fromSuggestions: any[] = [];
  toSuggestions: any[] = [];
  fromLoc: any = null;
  toLoc: any = null;
  routeInfo: any = null;

  fromMarker?: L.Marker;
  toMarker?: L.Marker;
  routeLayer?: L.Polyline;

  constructor(private svc: MapService) {}

  ngAfterViewInit() {
    this.map = L.map('map').setView([12.9716, 77.5946], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const latlng = e.latlng;
      const picked = {
        display_name: `Picked location (${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)})`,
        lat: latlng.lat,
        lon: latlng.lng
      };
      if (!this.fromLoc) {
        this.setFrom(picked);
        this.fromQuery = picked.display_name;
      } else if (!this.toLoc) {
        this.setTo(picked);
        this.toQuery = picked.display_name;
      } else {
        this.setTo(picked);
        this.toQuery = picked.display_name;
      }
    });
  }

  searchFrom() {
    if (!this.fromQuery) { this.fromSuggestions = []; return; }
    this.svc.geocode(this.fromQuery).subscribe(r => this.fromSuggestions = r);
  }

  searchTo() {
    if (!this.toQuery) { this.toSuggestions = []; return; }
    this.svc.geocode(this.toQuery).subscribe(r => this.toSuggestions = r);
  }

  selectFrom(item: any) { 
    this.setFrom(item); 
    this.fromSuggestions = []; 
  }

  selectTo(item: any) { 
    this.setTo(item); 
    this.toSuggestions = []; 
  }

  setFrom(item: any) {
    this.fromLoc = item;
    this.fromQuery = item.display_name;
    const lat = parseFloat(item.lat), lon = parseFloat(item.lon);
    if (this.fromMarker) this.map.removeLayer(this.fromMarker);
    this.fromMarker = L.marker([lat, lon]).addTo(this.map).bindPopup('From: ' + item.display_name);
    this.map.setView([lat, lon], 12);
  }

  setTo(item: any) {
    this.toLoc = item;
    this.toQuery = item.display_name;
    const lat = parseFloat(item.lat), lon = parseFloat(item.lon);
    if (this.toMarker) this.map.removeLayer(this.toMarker);
    this.toMarker = L.marker([lat, lon]).addTo(this.map).bindPopup('To: ' + item.display_name);
    this.map.setView([lat, lon], 12);
  }

  calcRoute() {
    if (!this.fromLoc || !this.toLoc) { alert('Select both locations'); return; }
    const start = { lat: parseFloat(this.fromLoc.lat), lng: parseFloat(this.fromLoc.lon) };
    const end = { lat: parseFloat(this.toLoc.lat), lng: parseFloat(this.toLoc.lon) };
    this.svc.route(start, end).subscribe(r => {
      if (this.routeLayer) this.map.removeLayer(this.routeLayer);
      this.routeLayer = L.polyline([[start.lat, start.lng], [end.lat, end.lng]]).addTo(this.map);
      this.routeInfo = { distance: r.distance, duration: r.duration };
      this.map.fitBounds(this.routeLayer.getBounds(), { padding: [40,40] });
    }, () => {
      alert('Route calculation failed');
    });
  }
  

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}
