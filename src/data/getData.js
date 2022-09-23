import fs from 'fs'

const spriteURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

const getData = async()=> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
    const json = await response.json()

    const data = json.results.map((pkmn, index)=> {
        return {
            number: index + 1,
            name: pkmn.name,
            sprite: `${spriteURL}/${index + 1}.png`
        }
    })

    fs.writeFileSync('src/data/data.json', JSON.stringify(data))
}


getData()