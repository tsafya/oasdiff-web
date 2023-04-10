import {Component} from '@angular/core';
import {ApiService} from "../services/api.service";
import {lastValueFrom} from "rxjs";
import { ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-breaking-changes',
  templateUrl: './breaking-changes.component.html',
  styleUrls: ['./breaking-changes.component.scss']
})
export class BreakingChangesComponent {
  response:any;
  originalSpec: any;
  revisionSpec: any;
  gridApi: any;
  public columnDefs: ColDef[] = [
    { field: 'id'},
    { field: 'level', maxWidth: 100},
    { field: 'operation', maxWidth: 120 },
    { field: 'path'},
    { field: 'source' },
    { field: 'text' }
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  constructor(private api: ApiService) {
  }
  async submitBreakingChanges(_original: any, _revision: any) {
    if(_original.length > 100 && _revision.length > 100) {
      try {
        this.response = await lastValueFrom(this.api.sendBreakingChanges(_original, _revision));
      }
      catch (error) {
        console.log(error);
      }
    } else {
        alert('Original Spec and Revised Spec must contain specs');
    }
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit()
  }

  submitFile(response: any, spec: any) {
    if (spec === 'original') {
      this.originalSpec = response;
    } else {
      this.revisionSpec = response;
    }
  }
  uploadFile = async (event: any, spec: string) => {
    const file:File = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          await this.submitFile(
            reader.result,
            spec
          );
        } catch (err) {
            console.log('Fail to read file stream')
        }
      };
      reader.onerror = (error) => {
        console.log('Failed to upload file')
      };
    reader.readAsText(file);
    console.log('COMPLETED');
  };
}
