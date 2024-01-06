import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { RecomendationProductsService } from '../../services/recomendation-products.service';
import { FileUploaderModalComponent } from '../../../../../../../core/components/file-uploader-modal/file-uploader-modal.component';
import { FileType } from '../../../../../../../core/enums/file-types';
import { concatMap, finalize, map, of } from 'rxjs';
import { FilesUtility } from '../../../../../../../shared/utilities/FilesUtility';

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.scss'
})
export class ExcelComponent {

  isDisableDownload : boolean = false;
  @Output() refreshTableEvent = new EventEmitter<void>();

  constructor(private recommendationProductsService : RecomendationProductsService,
    private dialog: Dialog){
  }

  openExcelDialog(){
    const dialogRef = this.dialog.open(FileUploaderModalComponent, {
      data : FileType.excel
    });

    dialogRef.closed
      .pipe(
        map(value => value as FormData),
        concatMap((data) => {
          if(data){
            return this.recommendationProductsService.addRangeFromExcel(data);
          }
          else{
            throw Error;
          }
        })
      )
      .subscribe(
        {
          complete: () => {
            this.refreshTableEvent.emit();
          }
        }
      );
  }

  downloadAsExcel(){
    this.isDisableDownload = true;

    this.recommendationProductsService.getExcel()
      .pipe(
        finalize(() => {
          this.isDisableDownload = false;
        })
      )
      .subscribe({
        next : (data) => {
          FilesUtility.download(data, "recommendationTable.xlsx");
        }
      })
  }
}
