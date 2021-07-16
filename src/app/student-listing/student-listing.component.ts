
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../student.service'

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.css']
})

export class StudentListingComponent implements AfterViewInit {
  public studentData = [];

  constructor(private studentService: StudentService) { }
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'class', 'subject', 'marks', 'actions'];
  dataSource = new MatTableDataSource(this.studentData);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    this.studentService
      .getData()
      .subscribe((res: any) => {
        console.log(res)
        this.studentData = res;
      });
  }
}


