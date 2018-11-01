export class IngresoEgresoModel {
	
	descripcion?:string;
	monto?:number;
	tipo?:string;
	uid?:string;

	constructor(obj:DataObj) {
		this.descripcion = (obj.descripcion)?obj.descripcion:null;
		this.monto = (obj.monto)?obj.monto:null;
		this.tipo = (obj.tipo)?obj.tipo:null;
		//this.uid = (obj.uid)?obj.uid:null;
	}
}
interface DataObj {
	descripcion?:string;
	monto?:number;
	tipo?:string;
	uid?:string;
}

	