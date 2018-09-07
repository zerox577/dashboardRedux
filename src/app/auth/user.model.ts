export class UserModel {
	
	public nombre?:string;
	public uid?:string;
	public email?:string;

	constructor(obj:DataObj) {
		this.nombre = (obj.nombre)?obj.nombre:null;
		this.uid = (obj.uid)?obj.uid:null;
		this.email = (obj.email)?obj.email:null;
	}
}
interface DataObj {
	uid:string;
	nombre:string;
	email:string;
}