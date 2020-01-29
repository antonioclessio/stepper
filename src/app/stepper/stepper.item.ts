import { StepperStateEnum } from './stepper-state.enum';

export class StepperItem {

    IconWaiting: string;
    IconCurrent: string;
    IconSuccess: string;
    IconError: string;
    Label: string;
    State: StepperStateEnum;
    Tooltip: string;
    Tag: number;
    Enabled: boolean = true;

    constructor(
        private label: string,
        private tooltip: string,
        private tag: number,
        private iconSuccess: string = 'fa-check',
        private iconWaiting: string = 'fa-hourglass-start',
        private iconCurrent: string = 'fa-clock-o',
        private iconError: string = 'fa-times',
        private state: StepperStateEnum = StepperStateEnum.Waiting
    ) {
        this.IconWaiting = this.iconWaiting;
        this.IconCurrent = this.iconCurrent;
        this.IconSuccess = this.iconSuccess;
        this.IconError = this.iconError;
        this.Label = this.label;
        this.State = this.state;
        this.Tooltip = this.tooltip;
        this.Tag = this.tag;
    }
}