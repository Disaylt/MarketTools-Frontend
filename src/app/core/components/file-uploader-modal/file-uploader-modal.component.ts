import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { TypeFileService } from '../../services/type-file.service';
import { FileType } from '../../enums/file-types';

@Component({
  selector: 'app-file-uploader-modal',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader-modal.component.html',
  styleUrl: './file-uploader-modal.component.scss'
})
export class FileUploaderModalComponent {
  
  accept : string | null = null;

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

    if (file && file.type === this.accept) {
      console.log(file)
      this.dialogRef.close();
    }
    else{
      console.log("Dont file")
    }
  }
}
