import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormArray } from "@angular/forms";
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  addStudentForms: FormGroup;
  public classData: any = [];
  constructor(private fb: FormBuilder, private studentService: StudentService) { }
  public subjectData: any = [];
  public editStudent: any = '';

  ngOnInit() {
    this.getClassData();
    this.addStudentForms = this.fb.group({
      firstname: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),

        ]
      ],
      lastname: [
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
    });

    if (this.editStudent) {
      this.studentService
        .updateStudent(this.editStudent, value)
        .subscribe((res: any) => {
          this.route.navigate(['/list']);
        });

    } else {
      this.studentService
        .addStudent(value)
        .subscribe((res: any) => {
          this.route.navigate(['/list']);
        });

    }

  }

}
