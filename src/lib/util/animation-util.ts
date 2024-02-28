import { AnimationProps, VariantLabels, TargetAndTransition } from "framer-motion"


export const staggeredAnimation = (index: number, inView: boolean, initial: any = {
  opacity: 0.5,
  x: -100,
  y: -20,
}): AnimationProps => {
  return {
    initial,
    animate: {
      opacity: inView ? 1 : initial.opacity,
      x: inView ? 0 : initial.x,
      y: inView ? 0 : initial.y,
    },
    transition: {
      duration: 0.45,
      delay: index * 0.3,
    }
  }
}


export const hoverAnimation = (type: 'shake' | 'scale', delay: number = 0): VariantLabels | TargetAndTransition => {
  return {
    scale: 1.04,
    skew: 2,
  }
}

export const linearIntroAnimation = (direction: 'top' | 'bottom' | 'left' | 'right' = 'left', delay: number = 0, duration: number = 0.45, inView: boolean = false,): AnimationProps => {
  let initial: any = {
    opacity: 0,
  }

  if (direction == 'top') {
    initial['y'] = -40;
  }
  if (direction == 'left') {
    initial['x'] = -40;
  }
  if (direction == 'bottom') {
    initial['y'] = 40;
  }
  if (direction == 'right') {
    initial['x'] = 40;
  }



  if (inView) {
    return {
      initial: 'hidden',
      animate: {
        opacity: inView ? 1 : 0.5,
        x: inView ? 0 : -100,
        y: inView ? 0 : -20,
      },
      transition: {
        duration,
        delay,
      }
    }
  }


  return {
    initial,
    animate: {
      x: 0,
      opacity: 1,
      y: 0,
    },
    transition: {
      duration,
      delay,
    }
  }
}