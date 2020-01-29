import { Component } from '@angular/core';
import { StepperItem } from './stepper/stepper.item';
import { StepperService } from './stepper/stepper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  stepperConfig: StepperItem[] = [];

  events: any[] = [];

  stepTags: any = {
    First: 1,
    Second: 2,
    Third: 3,
    Last: 4
  }

  constructor(
    private router: Router,
    private stepperService: StepperService
  ) {
    this.createStepper();
  }

  createStepper(): void {
    this.stepperConfig.push(new StepperItem('Step 1'   , 'Step 1 description', this.stepTags.First ));
    this.stepperConfig.push(new StepperItem('Step 2'   , 'Step 2 description', this.stepTags.Second));
    this.stepperConfig.push(new StepperItem('Step 3'   , 'Step 3 description', this.stepTags.Third ));
    this.stepperConfig.push(new StepperItem('Last Step', 'Step 4 description', this.stepTags.Last  ));
  }

  stepSelected(e: StepperItem): void {
    this.events.push({ event: 'Step Selected', data: e });
    switch (e.Tag) {
      case this.stepTags.First:  this.router.navigate(['/step1']); break;
      case this.stepTags.Second: this.router.navigate(['/step2']); break;
      case this.stepTags.Third:  this.router.navigate(['/step3']); break;
      case this.stepTags.Last:   this.router.navigate(['/step4']); break;
    }
  }

  onStatusChanged(e: any): void {
    this.events.push({ event: 'Status Changed', data: e });
    this.stepSelected(e.currentStep);
  }

  previous(): void {
    this.stepperService.previous();
  }

  next(): void {
    this.stepperService.next();
  }
}
