import { Motion, rAF, Tween } from 'ember-animated';
import { wait } from 'ember-animated';

export default function snippetResize(sprite, opts) {
  return new SnippetResize(sprite, opts).run();
}

export class SnippetResize extends Motion {
  prior = null;
  widthTween = null;
  heightTween = null;

  interrupted(motions) {
    let prior = motions.find((m) => m instanceof this.constructor);
    if (prior) {
      this.prior = prior;
    }
  }

  *animate() {
    let sprite = this.sprite;
    let duration = this.duration;
    let widthTween;
    let heightTween;

    sprite.assertHasInitialBounds();
    sprite.assertHasFinalBounds();

    if (sprite.finalBounds.width === 0) {
      yield wait(500);
    }

    if (!this.prior) {
      widthTween = this.widthTween = new Tween(
        sprite.initialBounds.width / sprite.initialCumulativeTransform.a,
        sprite.finalBounds.width / sprite.finalCumulativeTransform.a,
        duration,
        this.opts.easing
      );
      heightTween = this.heightTween = new Tween(
        sprite.initialBounds.height / sprite.initialCumulativeTransform.d,
        sprite.finalBounds.height / sprite.finalCumulativeTransform.d,
        duration,
        this.opts.easing
      );
    } else {
      widthTween = this.widthTween = new Tween(
        0,
        sprite.finalBounds.width / sprite.finalCumulativeTransform.a -
          this.prior.sprite.finalBounds.width,
        duration,
        this.opts.easing
      ).plus(this.prior.widthTween);
      heightTween = this.heightTween = new Tween(
        0,
        sprite.finalBounds.height / sprite.finalCumulativeTransform.d -
          this.prior.sprite.finalBounds.height,
        duration,
        this.opts.easing
      ).plus(this.prior.heightTween);
    }

    sprite.applyStyles({
      width: `${widthTween.currentValue}px`,
      height: `${heightTween.currentValue}px`,
    });

    while (!widthTween.done || !heightTween.done) {
      sprite.applyStyles({
        width: `${widthTween.currentValue}px`,
        height: `${heightTween.currentValue}px`,
      });
      yield rAF();
    }
  }
}
