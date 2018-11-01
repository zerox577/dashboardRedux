import { IngresoEgresoModel } from './ingreso-egreso.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgresoModel[], args?: any):IngresoEgresoModel[] {
    return items.sort( (a,b) => {
    	if(a.tipo === 'ingreso'){
    		return -1;
    	}else{
    		return 1;
    	}
    });
  }

}

    /*
    for (let i of this.itemsModal) {



      if (all == true && i['SIONO_SERIE'] == 'S') {
        console.log("i ", i);
        if(this.activaModal.seriales){

        }
        // continue;
        // break;
      }
    }
    item = (item.data) ? item.data : item;
    let idItem = (item.ID_ITEM) ? item.ID_ITEM : item.ID_ITEM_AFEC;
    let idDocumento = (item.ID_DOCUMENTO) ? item.ID_DOCUMENTO : item.ID_DOCUMENTO_AFEC;
    if (item.SIONO_SERIE && item.SIONO_SERIE == 'S' && item.CANTIDAD != 0) {
      this.result.serialesSalieron(idDocumento, idItem, this.temporal).then((result: any) => {
        if (result.rows.length > 0) {
          this.activaModal.seriales = true;
          result['rows'].forEach(element => {
            element[((element.length-1)+1)] = (element[5] == 1)?true:false;
          });
          this.lastPosition = result['rows'][0].length - 1;
          this.lastserial = result['rows'][0].length - 1;
          this.itemsModalSeriales = result['rows'];
          this.idItemMovimiento = idItem;
          this.idDocMovimiento = idDocumento;
          this.entraSale = 'S';
        } else {
          item.CANTIDAD = 0;
          item.ESTADO = false;
          this.appService.estadoMensajes('SERIALES', 'Este artículo no cuenta con seriales');
        }
      }).catch((e) => {
        this.appService.showMessage('Error', e, 'error');
      });
    */