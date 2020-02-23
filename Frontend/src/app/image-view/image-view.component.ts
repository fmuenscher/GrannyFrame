import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image-service/image.service';
import {Image} from '../models/Image';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  image: Image;

  constructor(public imageService: ImageService, public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imageService.getTestImage().then(value => {
      this.image = value;
    });
  }

}
