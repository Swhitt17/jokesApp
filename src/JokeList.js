import React, { useState,useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
// import "./JokeList.css";

/** List of jokes. */


const JokeList = ({numJokes = 5}) => {
const initialState = [];
const [jokes, setJokes] = useState(initialState);
const [isLoading, setIsLoading] = useState(true);



useEffect(function (){
async function addJokes() {
    let j = [...jokes];
    let seenJokes = new Set();
    try{
    while(j.length < numJokes){
       const res = await axios.get("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json" }
       }); 
       console.log(res.data)
       let { ...joke} = res.data;
         if(!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id)
            j.push({ ...joke, votes: 0 })
            console.log(j)
         }
         else{
             console.log("duplicate found!")
         }
        } 
         setJokes(j);
          setIsLoading(false);
    }catch (err){
       console.log(err)
        }
      
      }
      if(jokes.length === 0) addJokes();
    
    }, [jokes, numJokes]);


const getNewJokes = () => {
    setJokes([])
    setIsLoading(true);
    
}


const vote = (id, choice) => {
    setJokes(jokes =>
jokes.map(j => (j.id === id ? {...j, votes: j.votes + choice} : j))
    );

}

if (isLoading) {
          return (
            <div className="loading">
              <i className="fas fa-4x fa-spinner fa-spin" />
            </div>
          )
        }

let sortedJokes = [...jokes].sort((a,b) => b.votes - a.votes)



 return (
 
      <div className="JokeList">

        <button
          className="JokeList-getmore"
          onClick={getNewJokes}
        >
          Get New Jokes
        </button>


        {sortedJokes.map(({joke,id,votes}) => (
            <Joke 
            key={id}
            id={id}
            text={joke}
            vote={vote}
            votes={votes}
            />
        ))}
      </div>
    );
  }


export default JokeList;
 




