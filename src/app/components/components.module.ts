import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { GoogleMapsComponent } from './google_maps_component/google_maps.component';

@NgModule({
    declarations: [GoogleMapsComponent],
    imports: [CommonModule, IonicModule],
    exports: [GoogleMapsComponent],
    entryComponents: [GoogleMapsComponent]
})

export class ComponentsModule { }