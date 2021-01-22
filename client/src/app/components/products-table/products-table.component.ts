import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {CreateProductFormComponent} from "../create-product-form/create-product-form.component";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Product} from "../../models/product.model";


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'category', 'price', 'quantity', 'inventary', 'action' ];
  dataSource: any;

  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private productService: ProductsService,
              private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.updateTable();
  }

  updateTable() {
    this.productService.getProducts().then(data => {
      // @ts-ignore
      this.dataSource = new MatTableDataSource(data.products);
      console.log(this.dataSource);
      this.changeDetectorRefs.detectChanges();
    });
  }

  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(CreateProductFormComponent, { disableClose: true }).afterClosed().subscribe(result => {
      if (result){
        this.dataSource.filteredData.push(result);
        console.log(result);
        this.table.renderRows();
      }
    })
  }

  deleteProduct(elem: Product) {
    console.log(elem);
    this.dialog.open(ConfirmDialogComponent, {
      data: `¿Desea eliminar el producto seleccionado?`
    })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          const index = this.dataSource.filteredData.indexOf(elem, 0);
          if (index > -1) {
            this.dataSource.filteredData.splice(index, 1);
          }
          this.table.renderRows();
          this.productService.deleteProduct(elem._id.valueOf());
        }
      });
  }

  updateProduct(id: Number) {
    // @ts-ignore
    const product = this.productService.products.products.find(p => p._id === id);
    this.dialog.open(CreateProductFormComponent, {
      disableClose: true,
      data: product
    })
  }
}
