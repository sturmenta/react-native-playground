import React, { useState } from "react"
import { View, ViewProps } from "react-native"

interface ContainerWithDimensionsProps {
  children: ({
    width,
    height
  }: {
    width: number
    height: number
  }) => React.ReactNode
  viewProps?: ViewProps
}

export const ContainerWithDimensions: React.FC<
  ContainerWithDimensionsProps
> = ({ children, viewProps }: ContainerWithDimensionsProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  return (
    <View
      onLayout={(event) =>
        setDimensions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height
        })
      }
      {...viewProps}>
      {children(dimensions)}
    </View>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// usage

// <ContainerWithDimensions viewProps={{style: {}}}>
//   {({width, height}) => {
//     console.log('width', width);
//     console.log('height', height);
//     return <View />;
//   }}
// </ContainerWithDimensions>;
