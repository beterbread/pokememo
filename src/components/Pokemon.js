export default async function Pokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    return {
        pokemon: data['name'],
        sprite: data['sprites']['front_default']
    }
}