import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { StepperItem } from './stepper.item';
import { StepperStateEnum } from './stepper-state.enum';
import { IStepperComponent } from './istepper.interface';
import { StepperService } from './stepper.service';
import { StepperAction } from './stepper.action';

declare let $: any;

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
}) 
export class StepperComponent implements IStepperComponent, AfterViewInit, OnChanges {

  @Input('data') dataSource: StepperItem[] = [];
  @Input('current') currentStep: StepperItem = null;
  @Output('onStepSelected') onStepSelected: EventEmitter<StepperItem> = new EventEmitter<any>();
  @Output('onStatusChanged') onStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    StepperService.onRunAction.subscribe((response: any) => {
      switch(response.action) {
        case StepperAction.Select: this.stepSelect(response.data); break;
        case StepperAction.First: this.first(); break;
        case StepperAction.Next: this.next(); break;
        case StepperAction.Previous: this.previous(); break;
        case StepperAction.Disable: this.disable(response.data); break;
        case StepperAction.Enable: this.enable(response.data); break;
        case StepperAction.ChangeState: this.changeState(response.data.item, response.data.state); break;
      }
    });
  }

  ngOnChanges(e: SimpleChanges): void {
    if (e.dataSource && this.dataSource && !this.currentStep) {
      this.first();
      this.emitStatusChanged();
    }
  }

  ngAfterViewInit(): void {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  private getCurrentIndex(): number {
    let currentIndex = this.dataSource.findIndex(item => item.Tag == this.currentStep.Tag);
    return currentIndex;
  }

  private getNextStep(): StepperItem {
    let currentIndex = this.getCurrentIndex();
    if (currentIndex == this.dataSource.length - 1) return null;

    return this.dataSource[++currentIndex];
  }

  private emitStatusChanged(): void {
    let currentStep: StepperItem = this.currentStep;
    let nextStep: StepperItem = this.getNextStep();
    let previousStep: StepperItem = this.getPreviousStep();

    this.onStatusChanged.emit({ currentStep, nextStep, previousStep });
  }

  private getPreviousStep(): StepperItem {
    let currentIndex = this.getCurrentIndex();
    if (currentIndex == 0) return null;

    return this.dataSource[--currentIndex];
  }

  defineIconClass(e: StepperItem): any {
    switch (e.State) {
      case StepperStateEnum.Waiting: return e.IconWaiting;
      case StepperStateEnum.Success: return e.IconSuccess;
      case StepperStateEnum.Error: return e.IconError;
      case StepperStateEnum.Current: return e.IconCurrent;
    }
  }

  defineBackgroundClass(e: StepperItem): any {
    return {
      'shadow-sm text-white': e.Enabled,
      'bg-waiting': e.Enabled && e.State == StepperStateEnum.Waiting,
      'bg-success': e.Enabled && e.State == StepperStateEnum.Success,
      'bg-danger': e.Enabled && e.State == StepperStateEnum.Error,
      'bg-warning': e.Enabled && e.State == StepperStateEnum.Current
    };
  }

  stepSelect(dataItem: StepperItem): void {
    if (!dataItem.Enabled) return;

    this.onStepSelected.emit(dataItem);
    this.changeState(dataItem, StepperStateEnum.Current);
  }

  first(): void {
    this.currentStep = this.dataSource[0];
    this.currentStep.State = StepperStateEnum.Current;
  }

  next(): void {
    let currentIndex = this.getCurrentIndex();
    let currentStepIsCurrentState = this.currentStep.State == StepperStateEnum.Current;
    if (currentIndex == this.dataSource.length - 1 && !currentStepIsCurrentState) return;

    if (currentIndex == 0 && !currentStepIsCurrentState) {
      this.first();
    } else {
      let next = this.getNextStep();
      this.currentStep.State = StepperStateEnum.Success;
      
      if (next && next.Enabled) {
        next.State = StepperStateEnum.Current;
        this.currentStep = next;
      }
    }

    this.emitStatusChanged();
  }
  
  previous(): void {
    let currentIndex = this.getCurrentIndex();
    let currentStepIsCurrentState = this.currentStep.State == StepperStateEnum.Current;
    if (currentIndex == 0 && currentStepIsCurrentState) return;

    if (currentIndex == this.dataSource.length - 1 && !currentStepIsCurrentState) {
      this.currentStep.State = StepperStateEnum.Current;
    } else {
      let previous = this.getPreviousStep();
      this.currentStep.State = StepperStateEnum.Waiting;
      
      if (previous && previous.Enabled) {
        previous.State = StepperStateEnum.Current;
        this.currentStep = previous;
      }
    }

    this.emitStatusChanged();
  }

  changeState(item: StepperItem, state: StepperStateEnum): void {
    this.currentStep = item;
    this.currentStep.State = state;
  }
  
  disable(item: StepperItem): void {
    item.Enabled = false;
  }

  enable(item: StepperItem): void {
    item.Enabled = true;
  }
}
