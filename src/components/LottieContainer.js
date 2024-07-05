import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, Linking, Button } from 'react-native';

export interface LottieContainerProps {
  name: string;
  source: string;
  author: string;
  path: string;
}

export default function LottieContainer({
  name,
  source,
  author,
  path,
}) {
  const [show, setShow] = useState(true);

  return (
    <React.Fragment>
      <View style={styles.lottieContainer}>
        {show && (
          <LottieView
            source={path}
            autoPlay
            loop={false}
            onAnimationFinish={() => setTimeout(() => setShow(false), 1000)}
            resizeMode="contain"
          />
        )}
      </View>
      
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lottieContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
