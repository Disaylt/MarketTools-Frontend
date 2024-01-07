import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecomendationProductsService } from '../../services/recomendation-products.service';
import { FileUploaderModalComponent } from '../../../../../../../core/components/file-uploader-modal/file-uploader-modal.component';
import { FileType } from '../../../../../../../core/enums/file-types';
import { Observable, concatMap, finalize, map, of } from 'rxjs';
import { FilesUtility } from '../../../../../../../shared/utilities/FilesUtility';
import { ActionType } from '../../../../../../../core/enums/actions';

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.scss'
})
export class ExcelComponent{

  @Input() loadStatusEvent! : EventEmitter<boolean>
  @Input() reloadTableEvent! : EventEmitter<void>;
  isDisable : boolean = false;

  constructor(private recommendationProductsService : RecomendationProductsService,
    private dialog: Dialog){
  }
  
  downloadAsExcel(){
    this.isDisable = true;

    this.recommendationProductsService.getExcel()
      .pipe(
        finalize(() => {
          this.isDisable = false;
        })
      )
      .subscribe({
        next : (data) => {
          FilesUtility.download(data, "recommendationTable.xlsx");
        }
      })
  }

  addRange(){
    this.uploadExcel((x) => this.recommendationProductsService.addRangeFromExcel(x))
  }

  replaceRange(){
    this.uploadExcel((x) => this.recommendationProductsService.replaceRangeFromExcel(x))
  }

  private uploadExcel(action : (data : FormData) => Observable<Object>){
    const dialogRef = this.dialog.open(FileUploaderModalComponent, {
      data : FileType.excel
    });

    dialogRef.closed
      .pipe(
        map(value => value as FormData),
        concatMap((data) => {
          if(data){
            this.loadStatusEvent.emit(true);
            return action.call(null, data);
          }
          else{
            throw Error;
          }
        })
      )
      .subscribe(
        {
          complete : () => {
            this.reloadTableEvent.emit();
          },
          error : () => {
            this.loadStatusEvent.emit(false);
          }
        }
      );
  }
}
