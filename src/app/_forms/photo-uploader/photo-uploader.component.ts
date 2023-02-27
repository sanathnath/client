import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.css']
})
export class PhotoUploaderComponent implements OnDestroy {
  @Output() images = new EventEmitter();
  files: File[] = [];

  ngOnDestroy(): void {
    this.files = [];
  }

	onSelect(event: any) {
		this.files.push(...event.addedFiles);

    this.images.emit(this.files);
	}

	onRemove(event: any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
}
