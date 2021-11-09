let nombre = prompt('nombre del pokemon a buscar').toLowerCase()
let info = document.getElementById('info')
let sprite = document.getElementById('sprite')

const obtenerPokemon = async str => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${str}`)
        const data = await res.json()

        renderInfo(data)

        console.log(data)
    } catch(e) {
        throw new Error(e)
    }
}

const flUpper = word => {
    return word
    .toLowerCase()
    .split(' ')
    .map(letter => letter.charAt(0).toUpperCase() + letter.slice(1))
    .join(' ');
}

const renderInfo = data => {
    const { id, name, weight, sprites, height, types, abilities } = data

    
    let pokeId = document.createElement('p')
    let pokeIdText = document.createTextNode(`Numero: ${id}`)
    pokeId.appendChild(pokeIdText)

    let pokeName = document.createElement('p')
    let pokeNameText = document.createTextNode(`Nombre: ${flUpper(name)}`)
    pokeName.appendChild(pokeNameText)

    let pokeType = document.createElement('p')
    let pokeTypeText = document.createTextNode(`Tipo: ${flUpper(types[0].type.name)}`)
    pokeType.appendChild(pokeTypeText)

    const pA = abilities.map(el => {
        const { ability } = el
        return `${flUpper(ability.name)}`
    })

    let pokeAbilities = document.createElement('p')
    let pokeAbilitiesText = document.createTextNode(`Habilidades: ${pA.join(',\n')}`)
    pokeAbilities.appendChild(pokeAbilitiesText)

    let pokeHeight = document.createElement('p')
    let pokeHeightText = document.createTextNode(`Altura: ${height}`)
    pokeHeight.appendChild(pokeHeightText)
        
    let pokeWeight = document.createElement('p')
    let pokeWeightText = document.createTextNode(`Peso: ${weight}`)
    pokeWeight.appendChild(pokeWeightText)
    
    let img = document.createElement('img')
    img.src = sprites.front_default

    info.appendChild(pokeId)
    info.appendChild(pokeName)
    info.appendChild(pokeType)
    info.appendChild(pokeAbilities)
    info.appendChild(pokeHeight)
    info.appendChild(pokeWeight)
    sprite.appendChild(img)
}

obtenerPokemon(nombre)