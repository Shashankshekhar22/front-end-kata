import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'assemblyline',
  templateUrl: './assemblyline.component.html',
  styleUrls: ['./assemblyline.component.scss']
})
export class AssemblyLineComponent implements OnInit {
  @Input() stages: string[];
  listItems = {};

  ngOnInit(): void {
    this.stages.forEach((stage: string) => {
      this.listItems[stage] = [];
    });
  }

  onEnterKeyPressed(event: any): void {
    const stageOne = this.stages[0];
    if (event.target && event.target.value) {
      this.listItems[stageOne].unshift(event.target.value);
    }
  }

  onContextMenuClick(event: any, item: string, stage: string, stageIndex: number, itemIndex: number): void {
    if (stageIndex === 0) {
      this.listItems[stage].splice(itemIndex, 1);
    } else {
      const prevStage = this.stages[stageIndex - 1];
      this.listItems[prevStage].push(item);
      this.listItems[stage].splice(itemIndex, 1);
    }
    event.preventDefault();
  }

  onLeftClick(item: string, stage: string, stageIndex: number, itemIndex: number): void {
    if (stageIndex === 3) {
      this.listItems[stage].splice(itemIndex, 1);
    } else {
      const nextStage = this.stages[stageIndex + 1];
      this.listItems[nextStage].unshift(item);
      this.listItems[stage].splice(itemIndex, 1);
    }
  }
}