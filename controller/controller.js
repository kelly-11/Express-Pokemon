import {Pokemon} from "../models/model.js"
import axios from "axios"

function pokemonHome (request, response) {
    let randomPokemon = Math.floor(Math.random()*1000)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
    .then (pokemonAPI => pokemonAPI.data)
    .then(pokemonDetails => {

        response.render("pokemonHomepage.ejs", {pokemonData: pokemonDetails})
    })
}

function foundPokemon (request, response){  
    let pokemon = request.body.search
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then (pokemonAPI => pokemonAPI.data)
    .then(pokemonDetails => {
    
        response.render("foundPokemon.ejs", {pokemonSearch: pokemonDetails})
    })
}



function catchPokemon (request, response){
    let name = request.params.pokemonName
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then (pokemonAPI => pokemonAPI.data)
    .then(async pokemonDetails => {
        let pokemonName = pokemonDetails.name
        let pokemonAbility = pokemonDetails.abilities[0].ability.name
        let pokemonLevel = pokemonDetails.base_experience
        let pokemonImage = pokemonDetails.sprites.front_default

        await Pokemon.create({name: pokemonName, ability: pokemonAbility, level: pokemonLevel, image: pokemonImage})

    response.redirect("/")
})
}

async function pokemonCollection(request, response) {
    await Pokemon.find({}).then(collection => {
        response.render('pokemonCollection.ejs', {pokemonDetails: collection})
    })

}

async function deletePokemon(request, response) {
    const pokeID = request.params.pokeId
    await Pokemon.findOneAndDelete({_id: pokeID})
    response.redirect("/collection")

}

async function editPoke(request, response) {
    const pokeId = request.params.pokeId
    const poke = await Pokemon.findById(pokeId)
    response.render("updatePoke.ejs", {poke:poke})
}

async function updatePoke(request, response) {
   await Pokemon.findByIdAndUpdate(request.params.pokeId, request.body)
        .then(() => response.redirect('/collection'))
    }
    // const pokeId = request.params.pokeId
    // //const input = request.body
    // await Pokemon.findByIdAndUpdate({_id:pokeId})
    // response.redirect("/collection")


export{ pokemonHome, foundPokemon, catchPokemon, pokemonCollection, deletePokemon, editPoke, updatePoke}