import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../http.service";
import { UserLocationService } from "../services/user-location.service";
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-auto-search',
  templateUrl: './auto-search.component.html',
  styleUrls: ['./auto-search.component.css']
})
export class AutoSearchComponent implements OnInit {

  lat: number;
  lng: number;
  searchControl: FormControl;

  @ViewChild("search", { static: true })
  public searchElementRef: ElementRef;

  constructor(
    private http: HttpService,
    private geo: UserLocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //set latitude, longitude
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        });
      });
    });
  }

}
