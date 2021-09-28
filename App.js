import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function App() {

  const [running, setRunning] = useState(true);
  const [gameEngine, setgameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);


  useEffect(() => {
    setRunning(true)
  }, [])

  return (
    <View style={{height:'100%'}}>

      <Text style={{position:'absolute', fontSize: 40, fontWeight: 'bold', margin: 20, left: 150}}>{currentPoints}</Text>

        {!running ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{backgroundColor: 'black',height:70, width:150}}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30, textAlign: 'center'}}>
                START GAME
              </Text>
            </TouchableOpacity>
          </View> : null
        }

        <GameEngine
          ref={(ref) => {setgameEngine(ref)}}
          entities={entities()}
          systems={[Physics]}
          running={running}
          onEvent={(e) => {
            switch(e.type){
              case 'game_over':
                setRunning(false)
                gameEngine.stop()
                break;
              case 'new_point':
                setCurrentPoints(currentPoints + 1)
                break;
            }
          }}
          style={styles.engine}
        >

          <StatusBar style="auto"/>
          
        </GameEngine>

    </View>
  );
}

const styles = StyleSheet.create({
  engine:{
    position: 'relative',
    height:100
  },
});
