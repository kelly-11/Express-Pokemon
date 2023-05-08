import {pokemonHome, foundPokemon, catchPokemon, pokemonCollection, deletePokemon, updatePoke, editPoke} from "../controller/controller.js"
import express from "express"

const router = express.Router()

router.get("/", pokemonHome)

router.post("/foundPokemon", foundPokemon)

router.post("/catchPokemon/:pokemonName", catchPokemon)

router.get("/collection", pokemonCollection)

router.delete("/deletePokemon/:pokeId", deletePokemon)

router.get("/editPoke/:pokeId", editPoke)

router.put("/updatePoke/:pokeId", updatePoke)

export{router}