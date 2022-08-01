//import liraries
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Pressable } from 'react-native';

interface LottieLikeAnimationProps {
  isLiked: boolean;
  onPress?: () => void;
  clickCount: number;
}

const LottieLikeAnimation = (props: LottieLikeAnimationProps) => {
  const animation = React.useRef<LottieView>(null);

  useEffect(() => {
    if (!props.clickCount) return;

    if (props.isLiked) {
      if (animation.current) animation.current.play(32, 96);
    }
  }, [props.isLiked]);

  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <LottieView
        ref={animation}
        style={styles.heartLottie}
        source={require('../../../local/assets/lottie/like-animation.json')}
        autoPlay={false}
        loop={false}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heartLottie: {
    width: 150,
    height: 150,
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default LottieLikeAnimation;
