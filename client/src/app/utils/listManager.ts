export default class ListManager {
  constructor(private list: any[]) { }

  public updateList(newElement: any): any[] {
    for(let i = 0; i < this.list.length; ++i) {
      if(this.list[i]._id === newElement._id) {
        this.list[i] = { ...newElement }
        break;
      }
    }
    return this.list;
  }

  public deleteFromList(elem: any): any[] {
    let index = this.list.indexOf(elem);
    let newList: any[];
    for(let i = 0; i < this.list.length; ++i) {
      if(i !== index) {
        newList.push(this.list[i]);
      }
    }
    return newList;
  }
}
