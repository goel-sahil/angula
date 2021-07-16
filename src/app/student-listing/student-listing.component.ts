
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

  /**
   * Student Listing
   */
  getStudentData() {
    this.studentService
      .getStudents()
      .subscribe((res: any) => {
        let students: any = [];
        res.students.forEach((student: any) => {
          student.marks.forEach((subject: any, index: any) => {
            students.push({
              id: student.id,
              firstName: student.firstName,
              lastName: student.lastName,
              class: subject.class_subject.class.title,
              subject: subject.class_subject.subject.title,
              marks: subject.marks,
              isFirstRow: index == 0 ? true : false
            });
          });
        });
        this.studentData = students;
      });
  }

  /**
   * Delete Student
   */
  deleteStudent(id: any) {
    this.studentService
      .deleteStudent(id)
      .subscribe(() => {
        this.getStudentData();
      });
  }

  /**
   * Edit Student
   */
  editStudent(id: any) {
    // this.router.navigate()
  }
}


