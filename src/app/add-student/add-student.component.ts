import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormArray } from "@angular/forms";
import { StudentService } from '../student.service';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  addStudentForms: FormGroup;
  public classData: any = [];
  constructor(private fb: FormBuilder, private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }
  public subjectData: any = [];
  public studentData: any = [];
  public editStudent: any = '';

  ngOnInit() {
    this.getClassData();
    let sub = this.route.params.subscribe((params: any) => {
      this.editStudent = params["id"];

      if (this.editStudent) {
        this.getStudentDataById(this.editStudent);
      }
    });

    this.addStudentForms = this.fb.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),

        ]
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      marks: this.fb.array([]),
      class: [
        "",
        [
          Validators.required
        ]
      ],
    });
  }

  getStudentDataById(id: any) {
    this.studentService
      .getStudentById(id)
      .subscribe((res: any) => {

        this.studentData = res.student;
        console.log(this.studentData.marks[0].class_subject.classId)
        this.addStudentForms.patchValue({
          firstName: this.studentData.firstName,
          lastName: this.studentData.lastName
        });
        this.addStudentForms.controls["class"].setValue(this.studentData.marks[0].class_subject.class.classId);
      });
  }
  get marks(): FormArray {
    return this.addStudentForms.get("marks") as FormArray;
  }

  addMarksForm() {
    this.marks.push(this.fb.group({
      classSubjectId: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      total: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
    }));
  }

  getClassData() {
    this.studentService
      .getClasses()
      .subscribe((res: any) => {
        this.classData = res.classes;
      });
  }

  getSubjects(event: any) {
    this.studentService
      .getSubjects(event.value)
      .subscribe((res: any) => {
        this.subjectData = res.subjects;
        this.addStudentForms.controls['marks'].setValue([]);
        this.subjectData.forEach(() => {
          this.addMarksForm();
        });
      });
  }

  onSubmit(value: any) {
    this.subjectData.forEach((item: any, i: any) => {
      value.marks[i].classSubjectId = item.id
      value.marks[i].marks = value.marks[i].total
    });

    if (this.editStudent) {
      this.studentService
        .updateStudent(this.editStudent, value)
        .subscribe((res: any) => {
          this.router.navigate(['']);
        });

    } else {
      this.studentService
        .addStudent(value)
        .subscribe((res: any) => {
          this.router.navigate(['']);
        });

    }

  }

}
