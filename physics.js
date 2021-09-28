import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from "react-native";
import Burd from "./components/Burd";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Physics =  (entities, {touches, time, dispatch}) => {

    let engine = entities.physics.engine

    touches.filter(t => t.type == 'press')
    .forEach(t => {
        Matter.Body.setVelocity(entities.Burd.body, {
            x:0,
            y: -7
        })
    })

    Matter.Engine.update(engine, time.delta)

    for (let i = 1; i <= 2; i++) {

        if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${i}`].point) {

            entities[`ObstacleTop${i}`].point = true;
            dispatch({type: 'new_point'})

        }


        if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9)

            Matter.Body.setPosition(entities[`ObstacleTop${i}`].body, pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(entities[`ObstacleBottom${i}`].body, pipeSizePos.pipeBottom.pos)
        
            entities[`ObstacleTop${i}`].point = false;
        }

        Matter.Body.translate(entities[`ObstacleTop${i}`].body, {x: -3, y: 0})
        Matter.Body.translate(entities[`ObstacleBottom${i}`].body, {x: -3, y: 0})
        
    }

    Matter.Events.on(engine, 'collisionStart', (event) => {
        dispatch({type: 'game_over'})
    })

    return entities;
}

export default Physics;


