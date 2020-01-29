import { Injectable, EventEmitter } from '@angular/core';

import { IStepperComponent } from './istepper.interface';
import { StepperItem } from './stepper.item';
import { StepperStateEnum } from './stepper-state.enum';
import { StepperAction } from './stepper.action';

@Injectable({
    providedIn: 'root'
})
export class StepperService implements IStepperComponent {

    static onRunAction: EventEmitter<any> = new EventEmitter<any>();

    next(): void {
        StepperService.onRunAction.emit({ action: StepperAction.Next, data: null });
    }
    
    previous(): void {
        StepperService.onRunAction.emit({ action: StepperAction.Previous, data: null });
    }

    first(): void {
        StepperService.onRunAction.emit({ action: StepperAction.First, data: null });
    }

    select(item: StepperItem): void {
        StepperService.onRunAction.emit({ action: StepperAction.Select, data: item });
    }

    changeState(item: StepperItem, state: StepperStateEnum): void {
        StepperService.onRunAction.emit({ action: StepperAction.ChangeState, data: { item, state } });
    }
    
    disable(item: StepperItem): void {
        StepperService.onRunAction.emit({ action: StepperAction.Disable, data: item });
    }

    enable(item: StepperItem): void {
        StepperService.onRunAction.emit({ action: StepperAction.Enable, data: item });
    }

}