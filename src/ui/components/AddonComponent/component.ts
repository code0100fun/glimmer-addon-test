import Component, { tracked } from '@glimmer/component';

export default class AddonComponent extends Component {
  @tracked currentx = 0;
  speakers = ['Tom', 'Yehuda', 'Ed'];

  @tracked('current')
  get currentlySpeaking() {
    return this.speakers[this.currentx];
  }

  next() {
    this.currentx = this.currentx + 1;
    if (this.currentx >= this.speakers.length) {
      this.currentx = 0;
    }
  }
}
