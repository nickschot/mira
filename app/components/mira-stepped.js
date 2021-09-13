import Component from '@glimmer/component';

export default class MiraSteppedComponent extends Component {
  get classNames() {
    let classes = [];

    for (let i = 0; i <= this.args.step; i++) {
      classes.push(`step-${i}`);
    }

    return classes.join(' ');
  }
}
