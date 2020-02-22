import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image-service/image.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
  }

}
