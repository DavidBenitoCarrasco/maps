import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment, stylesGoogle, url } from '../../../environments/environment';

@Component({
  selector: 'app-map-modal',
  template: `
  <ion-content>
    <div class="map" #map></div>
  </ion-content>
`,
  styleUrls: ['./google_maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit, AfterViewInit {

  constructor(private modalCtrl: ModalController, private renderer: Renderer2) { }

  @ViewChild('map') mapElementRef: any;

  ngOnInit() { }

  ngAfterViewInit() {
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: 40.416, lng: -3.703 },
        zoom: 16,
        mapTypeControl: false,
        styles: stylesGoogle
      });

      map.addListener('click', event => {
        const seletedCoords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        this.modalCtrl.dismiss(seletedCoords);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url.urlGoogle + environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available');
        }
      };
    });
  }
}
