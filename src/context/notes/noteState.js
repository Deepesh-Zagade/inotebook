import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    
    const initialnote = [
        {
          "_id": "63074222eefe41f4ba51e4db",
          "user": "6304d84fa25fed9588dddbd5",
          "title": "Read Script",
          "description": "read Blood money script",
          "tag": "Movie",
          "date": "2022-08-25T09:34:26.550Z",
          "__v": 0
        },
        {
          "_id": "63074265eefe41f4ba51e4de",
          "user": "6304d84fa25fed9588dddbd5",
          "title": "Workshop",
          "description": "Attend martialarts workshop",
          "tag": "Preparation",
          "date": "2022-08-25T09:35:33.507Z",
          "__v": 0
        },
        {
            "_id": "63074265eefe41f4ba51e4de",
            "user": "6304d84fa25fed9588dddbd5",
            "title": "Workshop",
            "description": "Attend martialarts workshop",
            "tag": "Preparation",
            "date": "2022-08-25T09:35:33.507Z",
            "__v": 0
          },
          {
            "_id": "63074265eefe41f4ba51e4de",
            "user": "6304d84fa25fed9588dddbd5",
            "title": "Workshop",
            "description": "Attend martialarts workshop",
            "tag": "Preparation",
            "date": "2022-08-25T09:35:33.507Z",
            "__v": 0
          },
          {
            "_id": "63074265eefe41f4ba51e4de",
            "user": "6304d84fa25fed9588dddbd5",
            "title": "Workshop",
            "description": "Attend martialarts workshop",
            "tag": "Preparation",
            "date": "2022-08-25T09:35:33.507Z",
            "__v": 0
          },
          {
            "_id": "63074265eefe41f4ba51e4de",
            "user": "6304d84fa25fed9588dddbd5",
            "title": "Workshop",
            "description": "Attend martialarts workshop",
            "tag": "Preparation",
            "date": "2022-08-25T09:35:33.507Z",
            "__v": 0
          },
          {
            "_id": "63074265eefe41f4ba51e4de",
            "user": "6304d84fa25fed9588dddbd5",
            "title": "Workshop",
            "description": "Attend martialarts workshop",
            "tag": "Preparation",
            "date": "2022-08-25T09:35:33.507Z",
            "__v": 0
          },
          {
            "_id": "63074265eefe41f4ba51e4de",
            "user": "6304d84fa25fed9588dddbd5",
            "title": "Workshop",
            "description": "Attend martialarts workshop",
            "tag": "Preparation",
            "date": "2022-08-25T09:35:33.507Z",
            "__v": 0
          },
          {
            "_id": "63074265eefe41f4ba51e4de",
            "user": "6304d84fa25fed9588dddbd5",
            "title": "Workshop",
            "description": "Attend martialarts workshop",
            "tag": "Preparation",
            "date": "2022-08-25T09:35:33.507Z",
            "__v": 0
          }
      ]
      const [note,setNote] = useState(initialnote)

    return (
        <noteContext.Provider value={{note,setNote}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState