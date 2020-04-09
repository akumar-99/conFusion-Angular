import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { visibility, expand, hide } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand(),
    hide()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  errMess: string;

  visibilitySpinner = 'hidden';
  visibilityForm = 'shown';
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': "",
    'lastname': "",
    'telnum': "",
    'email': ""
  }

  validationMessages = {
    'firstname': {
      'required': "First name is requied",
      'minlength': "Atleast 2 characters long",
      'maxlength': "not more than 25 characters"
    },
    'lastname': {
      'required': "Last name is requied",
      'minlength': "Atleast 2 characters long",
      'maxlength': "not more than 25 characters"
    },
    'telnum': {
      'required': "Telephone No. requied",
      'pattern': "Should contain only numbers"
    },
    'email': {
      'required': "Telephone No. is requied",
      'email': "Invaid email format"
    }
  }

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: '',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //re(set) form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previos error message
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    this.visibilityForm = 'hidden';
    this.visibilitySpinner = 'shown';

    console.log(this.feedbackForm.value);

    this.feedbackService.submitFeedback(this.feedbackForm.value)
      .subscribe(feedback => {
        this.visibilitySpinner = 'hidden';
        this.feedback = feedback;
        setTimeout(func => {
          this.feedback = null;
          this.visibilityForm = 'shown';
        }, 5000)
      },
        errmess => { this.feedback = null; this.errMess = <any>errmess });


    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: '',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
