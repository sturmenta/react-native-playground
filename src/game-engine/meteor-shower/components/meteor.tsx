import Matter from "matter-js"
import React from "react"
import { View } from "react-native"

interface MeteorProps {
  body: Matter.Body
  color: string
  label: string
}

const _meteor = (props: MeteorProps) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2

  const color = props.color

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: color,
        borderStyle: "solid",
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody
      }}
    />
  )
}

export const Meteor: InitGameComponent = (world, color, pos, size, label) => {
  const initialMeteor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Meteor" }
  )
  Matter.World.add(world, initialMeteor)

  return {
    body: initialMeteor,
    color,
    pos,
    renderer: <_meteor color={color} body={initialMeteor} label={label || ""} />
  }
}
