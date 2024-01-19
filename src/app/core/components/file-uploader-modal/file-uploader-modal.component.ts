import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { TypeFileService } from '../../services/type-file.service';
import { FileType } from '../../enums/file-types';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../../shared/modal/modal.component";

@Component({
    selector: 'app-file-uploader-modal',
    standalone: true,
    templateUrl: './file-uploader-modal.component.html',
    styleUrl: './file-uploader-modal.component.scss',
    imports: [CommonModule, ModalComponent]
})
export class FileUploaderModalComponent {
  
  accept : string | null = null;
  isBadFile : boolean = false;

  constructor(
    public dialogRef: DialogRef<any>,
    typeFileService : TypeFileService,
    @Inject(DIALOG_DATA) fileType: FileType
  ) 
  {
    this.accept = typeFileService.getAccept(fileType);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.isBadFile = false;

    if (file && file.type === this.accept) {
      const formData = new FormData();
      formData.append("file", file, file.name)
      this.dialogRef.close(formData);
    }
    else{
      this.isBadFile = true;
    }
  }
}
