import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from "@angular/forms";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  addStudentForms: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
      marks: [
        "",
        [
          Validators.required
        ]
      ],
      class: [
        "",
        [
          Validators.required
        ]
        // Validators.compose(),
      ],
    });
  }


  onSubmit(value: any) {
    console.log(value)
  }

}
