import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AnalyticCardModel, SizeModel, WbComissionByCardCategory, WbSaleType } from '../../cards/models/card.model';
import { ColumnModel, DateColumnsModel } from '../../cards/models/table.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analytic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analytic-table.component.html',
  styleUrl: './analytic-table.component.scss'
})
export class AnalyticTableComponent implements OnInit, OnChanges {

  
  @Input({required : true}) sizes : SizeModel[] = [];
  @Input({required : true}) analyticDatesType : string = "Дни";
  @Input({required : true}) dates : Date[] = [];
  @Input({required : true}) card! : AnalyticCardModel;

  columns : ColumnModel[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["analyticDatesType"]){
      this.loadAsync();
    }
  }

  ngOnInit(): void {
    this.loadAsync();
  }

  loadAsync(){
    const columnsForEveryDay : ColumnModel[] = [];

    const startDate = this.dates[0];
    startDate.setHours(0,0,0,0);
    const endDate = this.dates[1];
    endDate.setHours(0,0,0,0);

    for(let indexDate = endDate; indexDate >= startDate; indexDate = new Date(indexDate.getTime() - (1000 * 60 * 60 * 24))){
      const dateForCompare = indexDate.setHours(0,0,0,0);

      const column : ColumnModel = {
        date : indexDate,
        title : indexDate.toLocaleDateString(),
        costPrice : this.getCostPrice(dateForCompare),
        sellerPrice : this.getSellerPrice(dateForCompare),
        sellerDiscount : this.getDiscount(dateForCompare),
        totalPrice : 0,
        buyerDiscount : this.getBuyerDiscount(dateForCompare),
        buyerPrice : 0,
        stock : this.getStock(dateForCompare),
        orders : this.getOrders(dateForCompare, false),
        ordersCost : this.getCostOrders(dateForCompare, false),
        cancels : this.getOrders(dateForCompare, true),
        canselsCost : this.getCostOrders(dateForCompare, true),
        sales : this.getSales(dateForCompare, WbSaleType.sale),
        salesCost : this.getCostSales(dateForCompare, WbSaleType.sale),
        refounds : this.getSales(dateForCompare, WbSaleType.refound),
        refoundsCost : this.getCostSales(dateForCompare, WbSaleType.refound),
        comission : this.getComission(dateForCompare)
      }
      column.totalPrice = this.getTotalPrice(column.sellerPrice, column.sellerDiscount);
      column.buyerPrice = this.getTotalPrice(column.totalPrice, column.buyerDiscount);

      if(column.costPrice > 0
        || column.sellerDiscount > 0
        || column.sellerPrice > 0
        || column.totalPrice > 0
        || column.buyerDiscount > 0
        || column.buyerPrice > 0
        || column.stock > 0
        || column.orders > 0
        || column.cancels > 0
        || column.refounds > 0
        || column.comission != null
      )
      {
        columnsForEveryDay.push(column);
      }
    }

    

    switch(this.analyticDatesType){
      case "Недели":
        this.columns = this.getWeeksColumns(columnsForEveryDay)
          .map(x=> this.combineColumns(x));
        break;
      case "Месяцы":
        this.columns = this.getMounthColumns(columnsForEveryDay)
          .map(x=> this.combineColumns(x));
        break;
      default:
        this.columns = columnsForEveryDay;
    }
  }

  private getMounthColumns(columnsForEveryDay : ColumnModel[]) : DateColumnsModel[]{
    
    const mountColumns : DateColumnsModel[] = [];

    for(const column of columnsForEveryDay){
      const mounth = column.date.getMonth();
      let dateColumn = mountColumns.find(x=> x.dateValue == mounth);

      if(dateColumn == undefined){
        const startDate = new Date(column.date.getFullYear(), column.date.getMonth() + 1, 0)
        const endDate = new Date(column.date.getFullYear(), column.date.getMonth())
        dateColumn = {dateValue : mounth, columns : [], startDate : startDate, endDate : endDate}
        mountColumns.push(dateColumn);
      }
      dateColumn.columns.push(column)
    }

    return mountColumns;
  }

  private getWeeksColumns(columnsForEveryDay : ColumnModel[]) : DateColumnsModel[]{
    let weekIndex = 0;
    const weekColumns : DateColumnsModel[] = []

    for(const column of columnsForEveryDay){
      let dateColumn = weekColumns.find(x=> x.dateValue == weekIndex);
      if(dateColumn == undefined){
        dateColumn = {dateValue : weekIndex, columns : [], startDate : null, endDate : null}
        weekColumns.push(dateColumn);
      }

      dateColumn.columns.push(column);

      if(column.date.getDay() == 0){
        dateColumn.startDate = column.date;
        weekIndex += 1;
      }

      if(column.date.getDay() == 6){
        dateColumn.endDate = column.date;
      }
    }

    return weekColumns;
  }

  private combineColumns(dateColumns : DateColumnsModel) : ColumnModel{

    const startDate = dateColumns.startDate?.toLocaleDateString() ?? this.dates[0].toLocaleDateString();
    const endDate = dateColumns.endDate?.toLocaleDateString() ?? this.dates[1].toLocaleDateString();
    const result : ColumnModel = {
      title : endDate + " - " + startDate,
      date : new Date(),
      costPrice : dateColumns.columns.map(x=> x.costPrice).reduce((sum, current) => sum + current, 0) / dateColumns.columns.length,
      totalPrice : dateColumns.columns.map(x=> x.totalPrice).reduce((sum, current) => sum + current, 0) / dateColumns.columns.length,
      sellerDiscount : dateColumns.columns.map(x=> x.sellerDiscount).reduce((sum, current) => sum + current, 0) / dateColumns.columns.length,
      sellerPrice : dateColumns.columns.map(x=> x.sellerPrice).reduce((sum, current) => sum + current, 0) / dateColumns.columns.length,
      buyerDiscount : dateColumns.columns.map(x=> x.buyerDiscount).reduce((sum, current) => sum + current, 0) / dateColumns.columns.length,
      buyerPrice : dateColumns.columns.map(x=> x.buyerPrice).reduce((sum, current) => sum + current, 0) / dateColumns.columns.length,
      stock : dateColumns.columns.map(x=> x.stock).reduce((sum, current) => sum + current, 0) / dateColumns.columns.length,
      orders : dateColumns.columns.map(x=> x.orders).reduce((sum, current) => sum + current, 0),
      ordersCost : dateColumns.columns.map(x=> x.ordersCost).reduce((sum, current) => sum + current, 0),
      cancels : dateColumns.columns.map(x=> x.cancels).reduce((sum, current) => sum + current, 0),
      canselsCost : dateColumns.columns.map(x=> x.canselsCost).reduce((sum, current) => sum + current, 0),
      sales : dateColumns.columns.map(x=> x.sales).reduce((sum, current) => sum + current, 0),
      salesCost : dateColumns.columns.map(x=> x.salesCost).reduce((sum, current) => sum + current, 0),
      refounds : dateColumns.columns.map(x=> x.refounds).reduce((sum, current) => sum + current, 0),
      refoundsCost : dateColumns.columns.map(x=> x.refoundsCost).reduce((sum, current) => sum + current, 0),
      comission : null
    }

    const comissions = dateColumns.columns.filter(x=> x.comission != null);

    if(comissions.length > 0){
      result.comission = comissions.map(x=> x.comission ?? 0).reduce((sum, current) => sum + current, 0) / comissions.length;
    }

    return result;
  }

  private getComission(date : number) : number | null{
    const comission = this.card
      .comissions
      .find(price => new Date(price.createDate).setHours(0,0,0,0) == date);

    if(comission != undefined && comission.use != null){
      switch(comission.use){
        case WbComissionByCardCategory.marketplace:
          return comission.marketplace;
        case WbComissionByCardCategory.paidStorage:
          return comission.paidStorage;
        case WbComissionByCardCategory.supplier:
          return comission.supplier;
        case WbComissionByCardCategory.supplierExpress:
          return comission.supplierExpress;
      }
    }

    return null;
  }

  private getCostSales(date : number, type : WbSaleType){
    return this.sizes
      .map(size => size
        .sales
        .find(sale => new Date(sale.date).setHours(0,0,0,0) == date && sale.type == type)?.countFinishedPrice ?? 0)
      .reduce((sum, current) => sum + Math.abs(current), 0);
  }

  private getSales(date : number, type : WbSaleType){
    return this.sizes
      .map(size => size
        .sales
        .find(sale => new Date(sale.date).setHours(0,0,0,0) == date && sale.type == type)?.count ?? 0)
      .reduce((sum, current) => sum + current, 0);
  }

  private getCostOrders(date : number, isCancel : boolean){
    return this.sizes
      .map(size => size
        .orders
        .find(order => new Date(order.date).setHours(0,0,0,0) == date && order.isCancel == isCancel)?.countFinishedPrice ?? 0)
      .reduce((sum, current) => sum + Math.abs(current), 0);
  }

  private getOrders(date : number, isCancel : boolean){
    return this.sizes
      .map(size => size
        .orders
        .find(order => new Date(order.date).setHours(0,0,0,0) == date && order.isCancel == isCancel)?.count ?? 0)
      .reduce((sum, current) => sum + current, 0);
  }

  private getStock(date : number){
    return this.sizes
      .map(size => size
        .stocks
        .find(price => new Date(price.date).setHours(0,0,0,0) == date)?.total ?? 0)
      .reduce((sum, current) => sum + current, 0);
  }

  private getTotalPrice(price : number, discount : number){
    return price * (1 - discount/100);
  }

  private getBuyerDiscount(date : number){
    return this.sizes
      .map(size => size
        .prices
        .find(price => new Date(price.createDate).setHours(0,0,0,0) == date)?.buyerDiscount ?? 0)
      .reduce((sum, current) => sum + current, 0) / this.sizes.length;
  }

  private getDiscount(date : number){
    return this.sizes
      .map(size => size
        .prices
        .find(price => new Date(price.createDate).setHours(0,0,0,0) == date)?.sellerDiscount ?? 0)
      .reduce((sum, current) => sum + current, 0) / this.sizes.length;
  }

  private getSellerPrice(date : number){
    return this.sizes
      .map(size => size
        .prices
        .find(price => new Date(price.createDate).setHours(0,0,0,0) == date)?.sellerPrice ?? 0)
      .reduce((sum, current) => sum + current, 0) / this.sizes.length;
  }

  private getCostPrice(date : number){
    return this.sizes
      .map(size => size
        .prices
        .find(price => new Date(price.createDate).setHours(0,0,0,0) == date)?.costPrice ?? 0)
      .reduce((sum, current) => sum + current, 0) / this.sizes.length;
  }
}
